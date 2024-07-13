import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CategoryList from './CategoryList';
import SubcategoryList from './SubcategoryList';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    bgcolor: 'rgba(0, 0, 0, 0.46)',  // Updated background color
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
};


const ModalHasReserva = ({ onClose, exercises }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBack = () => {
        setSelectedCategory(null);
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {selectedCategory ? (
                    <SubcategoryList 
                        category={selectedCategory} 
                        onBack={handleBack}
                    />
                ) : (
                    <CategoryList 
                        categories={exercises}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default ModalHasReserva;
