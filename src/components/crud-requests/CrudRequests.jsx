// ====={ GET // Fetch the Data (returns the raw data) }=====
function GetData() {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    return products
}

// ====={ DELETE // Removes given entry from data }=====
function DeleteData(id) {
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE'
        }) 
    })
}

// All of the following return nothing presently, but can be configured
// to return the given entry it affected 

// ====={ POST // Add a new entry to Data }=====
function PostData(obj) {
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
function PutData(id, obj) { // <= takes an obj, will replace any properties shared between the 2
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
let testObj = {
    'title': "lorem ipsum",
    'price': 39,
    'description': "whatever",
    'categoryId': 1,
    'images': ["https://i.imgur.com/axsyGpD.jpeg", "https://i.imgur.com/T8oq9X2.jpeg", "https://i.imgur.com/J6MinJn.jpeg"]
  }
// ^^^ I'm fairly sure the keys don't have to be strings, since thats what stringify does, but this is how it was working for me just in case.