import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubSubcategoryList = ({ subcategory, onBack }) => {
    return (
        <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2, color: 'white' }}>
                Volver a subcategorías
            </Button>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                {subcategory.titulo}
            </Typography>
            <Grid container spacing={2}>
                {subcategory.subSubgrupo.map((subSubcategory) => (
                    <Grid item xs={12} key={subSubcategory._id}>
                        <Card sx={{ display: 'flex', height: 200, overflow: 'hidden', bgcolor: 'lightblue' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 140, height: '100%', objectFit: 'cover', flexShrink: 0 }}
                                image={subSubcategory.imagenBase64}
                                alt={subSubcategory.duracion}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 140px)', overflow: 'hidden' }}>
                                <CardContent sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', '&:last-child': { paddingBottom: 2 }, textAlign: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        gutterBottom
                                        sx={{ wordBreak: 'break-word', fontWeight: 'bold' }}
                                    >
                                        {subSubcategory.duracion}
                                    </Typography>

                                    <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ wordBreak: 'break-word' }}>
                                            {subSubcategory.descripcion}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SubSubcategoryList;