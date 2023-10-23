import * as React from 'react';
import { useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ProductosGenerator from './ProductosGenerator';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function CrearProducto(productos) {
    console.log(productos.productos)
    const ImageURL = useRef('')
    const Titulo = useRef('')
    const Precio = useRef('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        productos.productos.push({id: productos.productos.length, img: ImageURL.current.value, titulo: Titulo.current.value, precio: Precio.current.value })
    };

    const [openCarrito, setOpenCarrito] = React.useState(false);
    const handleOpenCarrito = () => setOpenCarrito(true);
    const handleCloseCarrito = () => {
        setOpenCarrito(false)
    };

    return (
        <>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={productos.productos.length} color="secondary" max={9} onClick={handleOpenCarrito}>
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Card sx={{ width: 250, margin: 3 }}>
                <CardMedia
                    component="img"
                    alt="Producto"
                    height="140"
                    image="https://picsum.photos/200/300"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Producto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        $ Precio
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpen}>Agregar</Button>
                </CardActions>
            </Card>
            <ProductosGenerator productos={productos} />
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar producto
                    </Typography>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>URL Imagen</InputLabel>
                        <OutlinedInput
                            inputRef={ImageURL}
                            startAdornment={<InputAdornment position="start">🔗</InputAdornment>}
                            label="URL Imagen"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Titulo</InputLabel>
                        <OutlinedInput
                            inputRef={Titulo}
                            startAdornment={<InputAdornment position="start">✏️</InputAdornment>}
                            label="Titulo"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Precio</InputLabel>
                        <OutlinedInput
                            inputRef={Precio}
                            color='secondary'
                            startAdornment={<InputAdornment position="start">💲</InputAdornment>}
                            label="Precio"
                        />
                    </FormControl>
                    <Button variant="contained" color='secondary' onClick={handleClose}>Agregar</Button>
                </Box>
            </Modal>

            {/* CARRITO DE COMPRAS */}
            <Modal
                open={openCarrito}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar producto
                    </Typography>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>URL Imagen</InputLabel>
                        <OutlinedInput
                            inputRef={ImageURL}
                            startAdornment={<InputAdornment position="start">🔗</InputAdornment>}
                            label="URL Imagen"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Titulo</InputLabel>
                        <OutlinedInput
                            inputRef={Titulo}
                            startAdornment={<InputAdornment position="start">✏️</InputAdornment>}
                            label="Titulo"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Precio</InputLabel>
                        <OutlinedInput
                            inputRef={Precio}
                            color='secondary'
                            startAdornment={<InputAdornment position="start">💲</InputAdornment>}
                            label="Precio"
                        />
                    </FormControl>
                    <Button variant="contained" color='secondary' onClick={handleCloseCarrito}>Agregar</Button>
                </Box>
            </Modal>
        </>
    );
}