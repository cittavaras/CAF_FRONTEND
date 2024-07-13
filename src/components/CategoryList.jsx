import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';

const CategoryList = ({ categories, onCategoryClick }) => {
    return (
        <Box sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                ¿Qué quieres entrenar hoy?
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category._id}>
                        <Card sx={{ bgcolor: 'lightblue' }}>
                            <CardActionArea onClick={() => onCategoryClick(category)}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word' }}>
                                        {category.titulo}
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


export default CategoryList;
