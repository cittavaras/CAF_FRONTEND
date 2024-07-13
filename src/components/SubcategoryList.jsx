import React, { useState } from 'react';
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubSubcategoryList from './SubSubcategoryList';

const SubcategoryList = ({ category, onBack }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    const handleBackToSubcategories = () => {
        setSelectedSubcategory(null);
    };

    if (selectedSubcategory) {
        return (
            <SubSubcategoryList 
                subcategory={selectedSubcategory} 
                onBack={handleBackToSubcategories}
            />
        );
    }

    return (
        <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2, color: 'white' }}>
                Volver a categorías
            </Button>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                {category.titulo}
            </Typography>
            <Grid container spacing={2}>
                {category.subgrupo.map((subcategory) => (
                    <Grid item xs={12} sm={6} md={4} key={subcategory._id}>
                        <Card sx={{ bgcolor: 'lightblue' }}>
                            <CardActionArea onClick={() => handleSubcategoryClick(subcategory)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={subcategory.imagenBase64}
                                    alt={subcategory.titulo}
                                    sx={{ objectFit: 'contain' }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word' }}>
                                        {subcategory.titulo}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SubcategoryList;