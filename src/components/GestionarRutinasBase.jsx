import React, { useState, useEffect } from 'react';
import { 
    TextField, Button, FormControl, Modal, Box, Typography, 
    Grid, Card, CardContent, CardMedia, CardActionArea, IconButton, 
    Paper, Switch, FormControlLabel
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import useAxiosInterceptors from '../auth/axiosResponse';
import Swal from 'sweetalert2';
import baseURL from '../helpers/rutaBase';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const selectedCategoryStyle = {
    outline: '2px solid #1976d2',
    outlineOffset: '2px',
};

function GestionarRutinasBase() {
    const [formData, setFormData] = useState({ titulo: "", active: false });
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
    const [openSubSubcategoryModal, setOpenSubSubcategoryModal] = useState(false);
    const [subcategoryData, setSubcategoryData] = useState({ titulo: "", imagenBase64: "" });
    const [subSubcategoryData, setSubSubcategoryData] = useState({ duracion: "", descripcion: "", imagenBase64: "" });
    const accessToken = localStorage.getItem('accessToken');
    useAxiosInterceptors();
    const resizeImage = (file, maxSize) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              let width = img.width;
              let height = img.height;
              
              if (width > height) {
                if (width > maxSize) {
                  height *= maxSize / width;
                  width = maxSize;
                }
              } else {
                if (height > maxSize) {
                  width *= maxSize / height;
                  height = maxSize;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              
              canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
                resolve(resizedFile);
              }, 'image/jpeg', 0.7); // Adjust quality here. Lower value = smaller file size
            };
          };
          reader.onerror = (error) => reject(error);
        });
      };

      const handleChange = async (event) => {
        const { name, value, type, files, checked } = event.target;
        
        if (type === 'file') {
            const file = files[0];
            const maxSize = 512;
    
            try {
                const resizedFile = await resizeImage(file, maxSize);
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (name === 'subImagen') {
                        setSubcategoryData((prevData) => ({ ...prevData, imagenBase64: reader.result }));
                    } else if (name === 'subSubImagen') {
                        setSubSubcategoryData((prevData) => ({ ...prevData, imagenBase64: reader.result }));
                    } else {
                        setFormData((prevFormData) => ({ ...prevFormData, imagenBase64: reader.result }));
                    }
                };
                reader.readAsDataURL(resizedFile);
            } catch (error) {
                console.error('Error resizing image', error);
            }
        } else {
            if (name.startsWith('sub') && !name.startsWith('subSub')) {
                setSubcategoryData((prevData) => ({ 
                    ...prevData, 
                    [name.slice(3).toLowerCase()]: type === 'checkbox' ? checked : value 
                }));
            } else if (name.startsWith('subSub')) {
                setSubSubcategoryData((prevData) => ({ 
                    ...prevData, 
                    [name.slice(6).toLowerCase()]: type === 'checkbox' ? checked : value 
                }));
            } else {
                setFormData((prevFormData) => ({ 
                    ...prevFormData, 
                    [name]: type === 'checkbox' ? checked : value 
                }));
            }
        }
    };

    const validateForm = () => {
        if (!formData.titulo.trim()) {
            Swal.fire({
                icon: 'warning',
                text: 'El título es requerido',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            return false;
        }
        return true;
    };
    const handleEditCategory = (category) => {
        setFormData({
            id: category._id,
            titulo: category.titulo
        });
        handleOpenCategoryModal();
    };
    const handleToggleActive = async (event, categoryId) => {
        event.stopPropagation();
        try {
            const response = await axios.put(`${baseURL}/rutinaBase/${categoryId}/toggle-active`, {}, {
                headers: {
                    'Authorization': accessToken
                }
            });
            if (response.status === 200) {
                // Update the local state
                setCategories(categories.map(cat => 
                    cat._id === categoryId ? {...cat, active: !cat.active} : cat
                ));
                Swal.fire({
                    icon: 'success',
                    text: ` ${response.data.rutina.active ? 'Activado' : 'Desactivado'} correctamente`,
                    confirmButtonColor: 'rgb(158 173 56)',
                });
            }
        } catch (error) {
            console.error('Error cambiando estado activo:', error);
            Swal.fire({
                icon: 'error',
                text: 'Error cambiando estado activo',
                confirmButtonColor: 'rgb(158 173 56)',
            });
        }
    };
    const handleDeleteCategory = async (categoryId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        });
    
        if (result.isConfirmed) {
            try {
                await axios.delete(`${baseURL}/rutinaBase/${categoryId}`, {
                    headers: {
                        'Authorization': accessToken
                    }
                });
                
                Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
                
                // Clear the selected category if it's the one being deleted
                if (selectedCategory && selectedCategory._id === categoryId) {
                    setSelectedCategory(null);
                }
                
                // Refresh the categories list
                fetchCategories();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
                console.error(error);
            }
        }
    };
    const handleEditSubcategory = (subcategory) => {
        setSubcategoryData({
            id: subcategory._id,
            titulo: subcategory.titulo,
            imagenBase64: subcategory.imagenBase64
        });
        handleOpenSubcategoryModal();
    };

    const handleDeleteSubcategory = async (subcategoryId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${baseURL}/rutinaBase/subgrupo/${subcategoryId}`, {
                    headers: {
                        'Authorization': accessToken
                    }
                });
                Swal.fire('Eliminado!', 'La subcategoría ha sido eliminada.', 'success');
                fetchSubgrupos(selectedCategory._id);
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la subcategoría.', 'error');
                console.error(error);
            }
        }
    };
    const handleEditSubSubcategory = (subSubcategory) => {
        setSubSubcategoryData({
            id: subSubcategory._id,
            duracion: subSubcategory.duracion,
            descripcion: subSubcategory.descripcion,
            imagenBase64: subSubcategory.imagenBase64
        });
        handleOpenSubSubcategoryModal();
    };
    const handleDeleteSubSubcategory = async (subSubcategoryId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${baseURL}/rutinaBase/subsubgrupo/${subSubcategoryId}`, {
                    headers: {
                        'Authorization': accessToken
                    }
                });
                Swal.fire('Eliminado!', 'La sub-subcategoría ha sido eliminada.', 'success');
                fetchSubSubgrupos(selectedSubcategory._id);
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la sub-subcategoría.', 'error');
                console.error(error);
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const url = formData.id 
                ? `${baseURL}/rutinaBase/${formData.id}`
                : `${baseURL}/rutinaBase/`;
            const method = formData.id ? 'put' : 'post';
    
            const dataToSend = {
                titulo: formData.titulo,
                active: formData.active
            };
    
            await axios[method](url, dataToSend, {
                headers: {
                    'Authorization': accessToken
                }
            });
            Swal.fire({
                icon: 'success',
                text: formData.id ? 'Categoría actualizada con éxito' : 'Categoría creada con éxito',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            fetchCategories();
            handleCloseCategoryModal();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Error al guardar la información',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            console.error(error);
        }
    };
    const handleSubcategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const url = subcategoryData.id 
                ? `${baseURL}/rutinaBase/subgrupo/${subcategoryData.id}`
                : `${baseURL}/rutinaBase/subgrupo`;
            const method = subcategoryData.id ? 'put' : 'post';
    
            const response = await axios[method](url, {
                ...subcategoryData,
                rutinaBaseId: selectedCategory._id
            }, {
                headers: {
                    'Authorization': accessToken
                }
            });
    
            Swal.fire({
                icon: 'success',
                text: subcategoryData.id ? 'Subcategoría actualizada con éxito' : 'Subcategoría creada con éxito',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            handleCloseSubcategoryModal();
            
            fetchSubgrupos(selectedCategory._id);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Error al guardar la subcategoría',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            console.error(error);
        }
    };
    const handleSubSubcategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const url = subSubcategoryData.id 
                ? `${baseURL}/rutinaBase/subsubgrupo/${subSubcategoryData.id}`
                : `${baseURL}/rutinaBase/subsubgrupo`;
            const method = subSubcategoryData.id ? 'put' : 'post';
    
            const response = await axios[method](url, {
                ...subSubcategoryData,
                subgrupoId: selectedSubcategory._id
            }, {
                headers: {
                    'Authorization': accessToken
                }
            });
    
            Swal.fire({
                icon: 'success',
                text: subSubcategoryData.id ? 'Sub-subcategoría actualizada con éxito' : 'Sub-subcategoría creada con éxito',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            handleCloseSubSubcategoryModal();
            
            fetchSubSubgrupos(selectedSubcategory._id);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Error al guardar la sub-subcategoría',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            console.error(error);
        }
    };
    

    const fetchCategories = async () => {
        try {
            const resp = await axios.get(baseURL + '/rutinaBase/', {
                headers: {
                    'Authorization': accessToken
                }
            });
            setCategories(resp.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchSubgrupos = async (id) => {
        try {
            const resp = await axios.get(`${baseURL}/rutinaBase/${id}`, {
                headers: {
                    'Authorization': accessToken
                }
            });
            setSelectedCategory(prevCategory => ({
                ...prevCategory,
                subgrupo: resp.data.subgrupo
            }));
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchSubSubgrupos = async (id) => {
        try {
            const resp = await axios.get(`${baseURL}/rutinaBase/subgrupo/${id}`, {
                headers: {
                    'Authorization': accessToken
                }
            });
            setSelectedSubcategory(prevSubcategory => ({
                ...prevSubcategory,
                subSubgrupo: resp.data.subSubgrupo
            }));
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    

    const handleOpenCategoryModal = () => {
        setOpenCategoryModal(true);
    };
    const handleCloseCategoryModal = () => {
        setOpenCategoryModal(false);
        setFormData({ titulo: "" });
    };

    const handleOpenSubcategoryModal = () => {
        setOpenSubcategoryModal(true);
    };
    const handleCloseSubcategoryModal = () => {
        setOpenSubcategoryModal(false);
        setSubcategoryData({ titulo: "", imagenBase64: "" });
    };
    const handleOpenSubSubcategoryModal = () => {
        setOpenSubSubcategoryModal(true);
    };
    const handleCloseSubSubcategoryModal = () => {
        setOpenSubSubcategoryModal(false);
        setSubSubcategoryData({ duracion: "", descripcion: "", imagenBase64: "" });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory({...category, subgrupo: []});
        setSelectedSubcategory(null);
        fetchSubgrupos(category._id);
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory({...subcategory, subSubgrupo: []});
        fetchSubSubgrupos(subcategory._id);
    };
    const ImagePlaceholder = () => (
        <Box 
            sx={{ 
                width: 100,
                height: '100%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                bgcolor: 'grey.200' 
            }}
        >
            <ImageIcon sx={{ fontSize: 40, color: 'grey.400' }} />
        </Box>
    );
    return (
        <Grid container spacing={2} sx={{ height: '100vh', overflow: 'hidden' }}>
            {/* Categories (Left Side) */}
            <Grid item xs={12} md={3} sx={{ height: { xs: 'auto', md: '100vh' }, overflowY: 'auto', p: 2 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h5" gutterBottom>Categorías</Typography>
                </Paper>
                <Grid container spacing={2}>
                {categories.map((category) => (
    <Grid item xs={12} key={category._id}>
        <Card sx={selectedCategory && selectedCategory._id === category._id ? selectedCategoryStyle : {}}>      
            <CardActionArea onClick={() => handleCategoryClick(category)}>
                <Box sx={{ display: 'flex', height: 100, position: 'relative' }}>
                 
                    <CardContent sx={{ 
                        flex: 1,
                        overflow: 'auto',
                        p: 1,
                        '&::-webkit-scrollbar': {
                            width: '0.4em'
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            outline: '1px solid slategrey'
                        }
                    }}>
                        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{category.titulo}</Typography>
                    </CardContent>
                    <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        display: 'flex', 
                        flexDirection: 'column'
                    }}>
                        <IconButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditCategory(category);
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category._id);
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end',
                    pr: 1,
                    position: 'absolute',
                    bottom: 4,
                    right: 0,
                }}>
                    <Typography variant="caption" sx={{ 
                        mr: 1, 
                        color: category.active ? 'green' : 'red',
                        fontWeight: 'bold'
                    }}>
                        {category.active ? 'Activo' : 'Desactivado'}
                    </Typography>
                    <Switch
                        size="small"
                        checked={category.active}
                        onChange={(e) => handleToggleActive(e, category._id)}
                        onClick={(e) => e.stopPropagation()}
                        color="primary"
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'green',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'green',
                            },
                        }}
                    />
                </Box>
            </CardActionArea>
        </Card>
    </Grid>
))}
                </Grid>
                <Button onClick={handleOpenCategoryModal} variant="contained" fullWidth sx={{ mt: 2, mb: { xs: 2, md: 0 } }}>
    Agregar Categoría
</Button>
            </Grid>

 {/* Subcategories (Middle) */}
 <Grid item xs={12} md={3} sx={{ height: { xs: 'auto', md: '100vh' }, overflowY: 'auto', p: 2 }}>
                <Box sx={{ mt: { xs: 2, md: 0 } }}>
                    {selectedCategory ? (
                        <>
                            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    Subcategorías de {selectedCategory.titulo}
                                </Typography>
                            </Paper>
                            <Grid container spacing={2}>
                            {selectedCategory.subgrupo.map((sub) => (
    <Grid item xs={12} key={sub._id}>
        <Card sx={selectedSubcategory && selectedSubcategory._id === sub._id ? selectedCategoryStyle : {}}>
            <CardActionArea onClick={() => handleSubcategoryClick(sub)}>
                <Box sx={{ display: 'flex', height: 100, position: 'relative' }}>
                    {sub.imagenBase64 ? (
                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: '100%', objectFit: 'cover' }}
                            image={sub.imagenBase64}
                            alt={sub.titulo}
                        />
                    ) : (
                        <ImagePlaceholder />
                    )}
                    <CardContent sx={{ 
                        flex: 1,
                        overflow: 'auto',
                        p: 1,
                        '&::-webkit-scrollbar': {
                            width: '0.4em'
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            outline: '1px solid slategrey'
                        }
                    }}>
                        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{sub.titulo}</Typography>
                    </CardContent>
                    <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        display: 'flex', 
                        flexDirection: 'column'
                    }}>
                        <IconButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditSubcategory(sub);
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSubcategory(sub._id);
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    </Grid>
))}
                          
            </Grid>
            <Button onClick={handleOpenSubcategoryModal} variant="contained" sx={{ mt: 2 }}>
                Agregar Subcategoría
            </Button>
        </> ) : (
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" align="center">
                Selecciona una categoría para ver sus subcategorías
            </Typography>
        </Paper>)}
        </Box>
    
</Grid>
 {/* Sub-subcategories (Right) */}
 <Grid item xs={12} md={6} sx={{ height: { xs: 'auto', md: '100vh' }, overflowY: 'auto', p: 2 }}>
                <Box sx={{ mt: { xs: 2, md: 0 } }}>
                    {selectedSubcategory ? (
                        <>
                            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    Sub-subcategorías de {selectedSubcategory.titulo}
                                </Typography>
                            </Paper>
                            <Grid container spacing={2}>
                            {selectedSubcategory.subSubgrupo.map((subSub) => (
    <Grid item xs={12} sm={6} md={4} key={subSub._id}>
        <Card sx={{ display: 'flex', height: 200, position: 'relative' }}>
            {subSub.imagenBase64 ? (
                <CardMedia
                    component="img"
                    sx={{ width: 150, height: '100%', objectFit: 'cover' }}
                    image={subSub.imagenBase64}
                    alt={subSub.duracion}
                />
            ) : (
                <Box sx={{ width: 150, height: '100%' }}>
                    <ImagePlaceholder />
                </Box>
            )}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                width: 'calc(100% - 150px)',
                height: '100%',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ 
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                }}>
                   <Typography 
    variant="h6" 
    component="div" 
    gutterBottom 
    sx={{ 
        wordBreak: 'break-word', 
        fontWeight: 'bold' 
    }}
>
    {subSub.duracion}
</Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                        {subSub.descripcion}
                    </Typography>
                </CardContent>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    p: 1
                }}>
                    <IconButton onClick={() => handleEditSubSubcategory(subSub)} size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteSubSubcategory(subSub._id)} size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    </Grid>
))}
                            </Grid>
                            <Button onClick={handleOpenSubSubcategoryModal} variant="contained" sx={{ mt: 2 }}>
                                Agregar Sub-subcategoría
                            </Button>
                        </>
                    ) : (
                        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" align="center">
                                Selecciona una subcategoría para ver sus sub-subcategorías
                            </Typography>
                        </Paper>
                    )}
                </Box>
            </Grid>
            
            <Modal
    open={openCategoryModal}
    onClose={handleCloseCategoryModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {formData.id ? 'Editar categoría' : 'Crear nueva categoría'}
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                name='titulo'
                value={formData.titulo}
                onChange={handleChange}
                label="Título"
                variant="outlined"
                margin="normal"
                required
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.active}
                        onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                        name="active"
                        color="primary"
                    />
                }
                label="Activo"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Guardar
            </Button>
        </form>
    </Box>
</Modal>
            <Modal
                open={openSubcategoryModal}
                onClose={handleCloseSubcategoryModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
               <Box sx={modalStyle}>
               <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
    {subcategoryData.id ? 'Editar subcategoría' : 'Crear nueva subcategoría'}
</Typography>
    <form onSubmit={handleSubcategorySubmit}>
        <Box sx={{ display: 'flex', mb: 2 }}>
            <Box 
                sx={{ 
                    width: 150, 
                    height: 150, 
                    mr: 2, 
                    position: 'relative',
                    cursor: 'pointer'
                }}
                onClick={() => document.getElementById('subcategory-image-input').click()}
            >
                {subcategoryData.imagenBase64 ? (
                    <img 
                        src={subcategoryData.imagenBase64} 
                        alt="Subcategory preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                ) : (
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            bgcolor: 'grey.200',
                        }}
                    >
                        <ImageIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                    </Box>
                )}
                <input
                    id="subcategory-image-input"
                    type="file"
                    hidden
                    onChange={handleChange}
                    name="subImagen"
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <TextField
                    fullWidth
                    name='subTitulo'
                    value={subcategoryData.titulo}
                    onChange={handleChange}
                    label="Título"
                    variant="outlined"
                    margin="normal"
                />
               
            </Box>
        </Box>
        <Button type="submit" variant="contained" fullWidth>
            Guardar
        </Button>
    </form>
</Box>
            </Modal>
            <Modal
    open={openSubSubcategoryModal}
    onClose={handleCloseSubSubcategoryModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {subSubcategoryData.id ? 'Editar sub-subcategoría' : 'Crear nueva sub-subcategoría'}
        </Typography>
        <form onSubmit={handleSubSubcategorySubmit}>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <Box 
                    sx={{ 
                        width: 150, 
                        height: 150, 
                        mr: 2, 
                        position: 'relative',
                        cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('subsubcategory-image-input').click()}
                >
                    {subSubcategoryData.imagenBase64 ? (
                        <img 
                            src={subSubcategoryData.imagenBase64} 
                            alt="Sub-subcategory preview" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    ) : (
                        <Box 
                            sx={{ 
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                bgcolor: 'grey.200',
                            }}
                        >
                            <ImageIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                        </Box>
                    )}
                    <input
                        id="subsubcategory-image-input"
                        type="file"
                        hidden
                        onChange={handleChange}
                        name="subSubImagen"
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <TextField
                        fullWidth
                        name='subSubDuracion'
                        value={subSubcategoryData.duracion}
                        onChange={handleChange}
                        label="Duración"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        name='subSubDescripcion'
                        value={subSubcategoryData.descripcion}
                        onChange={handleChange}
                        label="Descripción"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={3}
                    />
                </Box>
            </Box>
            <Button type="submit" variant="contained" fullWidth>
                Guardar
            </Button>
        </form>
    </Box>
</Modal>
            </Grid>
    );
}

export default GestionarRutinasBase;
