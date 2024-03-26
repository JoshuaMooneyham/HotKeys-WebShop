import { useState, useEffect } from "react";

// ##### PRODUCT DATA #####

// ====={ GET // Fetch the Data (returns the raw data) }=====
export function GetProducts() {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
                .then(data => setProducts(data))
        }, [])
    // vv Parses the list of photos into actual URLs vv
    products.forEach(product => product.images = photoFormatter(product.images));

    return products
}

// ====={ DELETE // Removes given entry from data, returns nothing }=====
export function DeleteProducts(id) {
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE'
        }) 
    }, [])
}

// All of the following return nothing presently, but can be configured
// to return the given entry it affected 

// ====={ POST // Add a new entry to Data }=====
export function PostProducts(obj) {
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products', {
            method: 'POST', 
            headers: { // seems to be required to work
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj) // the given object is inserted and stringified here
        })
    }, [])
}

// ====={ PUT // Edit data of a given entry }=====
export function PutProducts(id, obj) { // <= takes an obj, will replace any properties shared between the 2 <<DOESN'T HAVE TO BE ALL PROPS>>
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(obj)
        })
    }, [])
}

// ====={ Dummy Object I used to test POST // NEED THESE FIELDS!! }=====
export let testObj = {
    'title': "Mountain Shirt",
    'price': 39,
    'description': "Shirt wit da mountain on it",
    'categoryId': 1,
    'images': ['https://i.imgur.com/QkIa5tT.jpeg']
  }
// ^^^ I'm fairly sure the keys don't have to be strings, since thats what stringify does, but this is how it was working for me just in case.

// ====={ PHOTO FIXER }=====
export function photoFormatter(photos) {
    const regex = /['\[\]"]/g; // Regular Expression - will catch any of the given characters
    const fixedPhotos = [];
    for (let element in photos) {
        let newURL = photos[element].replace(regex, '');
        newURL = newURL.includes('placeimg.com') ? 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png' : newURL;
        fixedPhotos.push(newURL);
    }
    return fixedPhotos;
}

// ##### USER DATA #####

export function GetUsers() {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
    fetch('https://api.escuelajs.co/api/v1/users')
        .then(response => response.json())
            .then(data => setUsers(data))
    }, [])
    // vv Parses the list of photos into actual URLs vv

    return users
}

export function PostUsers(obj) {
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/users', {
            method: 'POST', 
            headers: { // seems to be required to work
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj) // the given object is inserted and stringified here
        })
    }, [])
}