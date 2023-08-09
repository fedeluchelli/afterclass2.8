//importar promesas
import { promises as fs } from "fs";

// path - ruta de la cual consultar
const path = "./productos.json";

// clase ProductManager
/*
class ProductManager{
  constructor()
  async getProducts(){

  }
}
*/

//getProducts - consultará los productos que tenga el txt, json o BD
const getProducts = async () => {
  const prods = JSON.parse(await fs.readFile(path, "utf-8"));
  console.log(prods);
};
//getProducts(); // consultar si funciona. Funciona

//getProductsById - recibirá un ID como parámetro y consultará un solo producto
const getProductsById = async (id) => {
  const prods = JSON.parse(await fs.readFile(path, "utf-8"));
  const producto = prods.find((prod) => prod.id === id);

  if (producto) console.log(producto);
  else console.log("Producto no encontrado");
};

//getProductsById(1);

//addProduct - si no existe agregar producto y si ya existe avisar
const addProduct = async (product) => {
  const prods = JSON.parse(await fs.readFile(path, "utf-8"));
  const producto = prods.find((prod) => prod.id === product.id);

  if (producto) {
    //consulta si el producto existe
    console.log("Producto ya agregado");
  } else {
    prods.push(product);
    //para modificar un array se debe pisar el anterior contenido
    await fs.writeFile(path, JSON.stringify(prods));
  }
};

const product1 = { id: 1, nombre: "Arroz" };
const product2 = { id: 2, nombre: "Fideos" };
const product3 = { id: 3, nombre: "Garbanzos" };
//addProduct(product3);

//updateProduct
const updateProduct = async (id, product) => {
  const prods = JSON.parse(await fs.readFile(path, "utf-8"));
  const indice = prods.findIndex((prod) => prod.id === id);

  if (indice !== -1) {
    //acá se cambia la propiedad y debe repetirse con todas las que se modifiquen
    prods[indice].nombre = product.nombre;
    //para luego poner la superposición
    await fs.writeFile(path, JSON.stringify(prods));
  } else {
    console.log("Producto no encontrado");
  }
};

//updateProduct(1, { nombre: "Pan" });
//updateProduct(5, { nombre: "Lactal" });

//getProducts();

//deleteProduct

const deleteProduct = async (id) => {
  const prods = JSON.parse(await fs.readFile(path, "utf-8"));
  const producto = prods.find((prod) => prod.id === id);

  if (producto) {
    await fs.writeFile(
      path,
      JSON.stringify(prods.filter((prod) => prod.id != id))
    );
  } else {
    console.log("Producto no encontrado");
  }
};

//deleteProduct(1);
getProducts();
