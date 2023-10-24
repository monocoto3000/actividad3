import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

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


export default function ProdcutoCards(props) {
    let auxArray = props.array
    console.log(props.array)
    const ImageURL = useRef("")
    const Titulo = useRef("")
    const Precio = useRef("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        props.aux.img = ImageURL.current.value;
        props.aux.titulo = Titulo.current.value;
        props.aux.precio = Precio.current.value;
    };

    const eliminarPorducto = () => {
        const elementoAEliminar = props.aux; 
        const nuevoArreglo = props.array.filter(item => item !== elementoAEliminar);
        auxArray = [...nuevoArreglo]
        console.log(auxArray)
    }

    return (
        <>
            <Card sx={{ minWidth: 250, margin: 3 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={props.aux.img} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.aux.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        $ {props.aux.precio}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color='secondary' onClick={handleOpen}>Editar</Button>
                    <Button size="small" color='secondary' onClick={eliminarPorducto}>Eliminar</Button>
                    <Button size="small">
                        <StyledBadge badgeContent={"+"} color="secondary">
                            <ShoppingCartIcon color='secondary' />
                        </StyledBadge>
                    </Button>
                </CardActions>
            </Card>


            {/* EDITAR */}
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
                            defaultValue={props.aux.img}
                            startAdornment={<InputAdornment position="start">🔗</InputAdornment>}
                            label="URL Imagen"
                            color='secondary'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount" color='secondary'>Titulo</InputLabel>
                        <OutlinedInput
                            inputRef={Titulo}
                            defaultValue={props.aux.titulo}
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
                            defaultValue={props.aux.precio}
                            startAdornment={<InputAdornment position="start">💲</InputAdornment>}
                            label="Precio"
                        />
                    </FormControl>
                    <Button variant="contained" color='secondary' onClick={handleClose}>Agregar</Button>
                </Box>
            </Modal>
        </>
    );
}