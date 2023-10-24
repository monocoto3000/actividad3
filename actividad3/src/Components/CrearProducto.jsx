import React, { useState } from 'react';
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

export default function CrearProducto() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [open, setOpen] = React.useState(false);
    console.log(productos)
    const ImageURL = useRef('')
    const Titulo = useRef('')
    const Precio = useRef('')
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        productos.push({ id: productos.length, img: ImageURL.current.value, titulo: Titulo.current.value, precio: Precio.current.value })
    };

    const [openCarrito, setOpenCarrito] = React.useState(false);
    const [cantCarrito, setcantCarrito] = React.useState(0);
    const handleOpenCarrito = () => setOpenCarrito(true);
    const handleCloseCarrito = () => {
        setOpenCarrito(false)
    };
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const handleOpenEditForm = (id) => {
        setProductoAEditar(id);
        setOpenEditForm(true)
    }
    const auxImageURL = useRef('')
    const auxTitulo = useRef('')
    const auxPrecio = useRef('')

    const editarProducto = () => {
        if (productoAEditar !== null) {
            const productosCopia = [...productos];
            const productoEditado = productosCopia.find(producto => producto.id === productoAEditar);
            if (productoEditado) {
                productoEditado.img = auxImageURL.current.value;
                productoEditado.titulo = auxTitulo.current.value;
                productoEditado.precio = auxPrecio.current.value;
                setProductos(productosCopia);
                setOpenEditForm(false);
            }
        }
    };

    const eliminarProducto = (id) => {
        const nuevoProducto = productos.filter((producto) => producto.id !== id);
        setProductos(nuevoProducto);
    }

    const agregarCarrito = (id) => {
        carrito.push(productos[id])
        console.log(carrito.length)
        setcantCarrito(carrito.length)
    }

    const eliminarProductoCarrito = (id) => {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
        setCarrito(nuevoCarrito);
        setcantCarrito(carrito.length - 1);
    }

    return (
        <>
            {/* AGREGAR PRODUCTO */}
            <IconButton aria-label="cart" style={{ margin: 15 }}>
                <StyledBadge badgeContent={cantCarrito} color="secondary" max={9} onClick={handleOpenCarrito}>
                    <ShoppingCartIcon fontSize='large' color="secondary" />
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
                    <Button size="small" onClick={handleOpen} color='secondary'>Agregar</Button>
                </CardActions>
            </Card>
            {/* CARDS DE LOS PRODUCTOS */}
            {/* URLS DE EJEMPLO */}
            {/* https://placebear.com/g/200/200
            https://cdn.shopify.com/s/files/1/1830/5085/products/VE0007_BCAA_Capsule_90ct_2048x2048.png?v=1494855182
            https://source.unsplash.com/user/c_v_r/1900×800
            https://via.placeholder.com/300.png/09f/fff */}
            <div style={{ display: "flex" }}>
                {productos.map(producto =>
                    <div key={producto}>
                        <Card sx={{ display: 'flex', margin: 3, height: "130px" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {producto.titulo}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        $ {producto.precio}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Button size="small" color='secondary' onClick={() => handleOpenEditForm(producto.id)}>Editar</Button>
                                    <Button size="small" color='secondary' onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                                    <Button size="small">
                                        <StyledBadge badgeContent={"+"} color="secondary" onClick={() => agregarCarrito(producto.id)}>
                                            <ShoppingCartIcon color='secondary' />
                                        </StyledBadge>
                                    </Button>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={producto.img}
                            />
                        </Card>
                        <Modal
                            open={openEditForm}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Editar {producto.titulo}
                                </Typography>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>URL Imagen</InputLabel>
                                    <OutlinedInput
                                        inputRef={auxImageURL}
                                        defaultValue={productos[producto.id].img}
                                        startAdornment={<InputAdornment position="start">🔗</InputAdornment>}
                                        label="URL Imagen"
                                        color='secondary'
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Titulo</InputLabel>
                                    <OutlinedInput
                                        inputRef={auxTitulo}
                                        defaultValue={productos[producto.id].titulo}
                                        startAdornment={<InputAdornment position="start">✏️</InputAdornment>}
                                        label="Titulo"
                                        color='secondary'
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Precio</InputLabel>
                                    <OutlinedInput
                                        inputRef={auxPrecio}
                                        color='secondary'
                                        defaultValue={productos[producto.id].precio}
                                        startAdornment={<InputAdornment position="start">💲</InputAdornment>}
                                        label="Precio"
                                    />
                                </FormControl>
                                <Button variant="contained" color='secondary' onClick={() => editarProducto(producto.id)}>Actualizar</Button>
                            </Box>
                        </Modal>
                    </div>
                )}
            </div>
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
                            type='text'
                            startAdornment={<InputAdornment position="start">🔗</InputAdornment>}
                            label="URL Imagen"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Titulo</InputLabel>
                        <OutlinedInput
                            inputRef={Titulo}
                            type='text'
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
                            type='number'
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
                        🛒 Carrito de compras
                    </Typography>
                    {carrito.map(compras =>
                        <>
                            <Typography variant='subtitle2'>
                                🛍️ ID del producto |  <Typography variant='overline'>{compras.id}</Typography><Button style={{ float: "right" }} color='secondary' onClick={() => eliminarProductoCarrito(compras.id)}>Eliminar</Button>
                            </Typography>
                            <Typography variant='subtitle2'>
                                Nombre del producto |  <Typography variant='overline'>{compras.titulo}</Typography>
                            </Typography><Typography variant='subtitle2'>
                                Precio |  <Typography variant='overline'>$ {compras.precio}</Typography>
                            </Typography>
                        </>
                    )}
                    <div style={{ textAlign: "center" }}>
                        <br />
                        <Button color='secondary' onClick={handleCloseCarrito}>Finalizar</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}