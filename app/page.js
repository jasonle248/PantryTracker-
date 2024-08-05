'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/app/firebase' 
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState(' ')
  const [searchQuery, setSearchQuery] = useState('')


  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      const data = doc.data()
      if (!isNaN(data.quantity)) {  // Check if quantity is a valid number
        inventoryList.push({
          name: doc.id,
          ...data,
        })
      }
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }
  

useEffect(() => {
  updateInventory()
}, [])

const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

const addItem = async (item) => {  //add item function
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { quantity } = docSnap.data()
    await setDoc(docRef, { quantity: quantity + 1 })
  } else {
    await setDoc(docRef, { quantity: 1 })
  }
  await updateInventory()
}

const removeItem = async (item) => {  //remove item function
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { quantity } = docSnap.data()
    if (quantity === 1) {
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, { quantity: quantity - 1 })
    }
  }
  await updateInventory()
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const filteredInventory = inventory.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
)


return (
  <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
    sx={{ backgroundColor: '#e0f7fa', padding: '20px' }}

  >
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" onClick={handleOpen}>
      Add New Item
    </Button>
    <Box border={'1px solid #333'}>
      <Box
        width="800px"
        height="100px"
        bgcolor={'#ADD8E6'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Inventory Items
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
        {inventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            paddingX={5}
          >
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              Quantity: {quantity}
            </Typography>
            <Stack direction = "row" spacing = {2}>
            <Button variant="contained" onClick={() => addItem(name)}>
              Add
            </Button>
            <Button variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>
            </Stack>
          </Box> 
         
        ))}
      </Stack>
    </Box>
    <TextField
  label="Search Items"
  variant="outlined"
  fullWidth
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{ mb: 2, backgroundColor: 'white' }}
/>
{filteredInventory.map(({ name, quantity }) => (
  <Box
    key={name}
    width="100%"
    minHeight="150px"
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    bgcolor={'#f0f0f0'}
    paddingX={5}
    
  >
    <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Typography>
    <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
      Quantity: {quantity}
    </Typography>
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => addItem(name)}>
        Add
      </Button>
      <Button variant="contained" onClick={() => removeItem(name)}>
        Remove
      </Button>
    </Stack>
  </Box>
))}
  </Box>
)
}

