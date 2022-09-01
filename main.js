//Cibler les noeuds html

let shop = document.getElementById("shop")
let cartShop = document.getElementById("cartShop")
let cart = document.getElementById("cart")
let billSpan = document.getElementById("billOnScreen")


// Partie Data

let shopItemsD = [{
    id: "asfdjgh",
    name: "Elden Ring",
    price: 70,
    desc: "Elden Ring est un jeu vidéo d'action-RPG développé par FromSoftware et édité par Bandai Namco Entertainment",
    descBis: "Jeu d'aventure, Monde ouvert, Action-RPG, Jeu de combat, Jeu de plates-formes, Gameplay non linéaire.",
    img: "imgs/EldenRing.jpg",

},
{
    id: "asfdjarggh",
    name: "God of War 2018",
    price: 50,
    desc: "God of War est un jeu vidéo d'action-aventure développé par SIE Santa Monica Studio et édité par Sony Interactive Entertainment",
    descBis: "Jeu d'action-aventure, Jeu vidéo de rôle, Jeu de combat, Hack 'n' slash, Adventure.",
    img: "imgs/GodofWar.jpg",
},
{
    id: "asdsfgh",
    name: "The Elder Scrolls V Skyrim",
    price: 40,
    desc: "The Elder Scrolls V est un jeu vidéo de rôle et d'action développé par Bethesda Game Studios et édité par Bethesda Softworks",
    descBis: "Monde ouvert, Divertissement, Fantasy, Action-RPG.",
    img: "imgs/TheElderScrollsVSkyrim.jpg",
},
{
    id: "asdsdghhgsfgh",
    name: "The Last of US Part II",
    price: 35,
    desc: "The Last of Us Part II est un jeu vidéo d’action-aventure, de type survival horror.",
    descBis: "Jeu d'action-aventure, Survival horror, Jeu de tir.",
    img: "imgs/TheLastofUSPartII.png",
},
{
    id: "sthssfgh",
    name: "Stray",
    price: 72,
    desc: "Stray est un jeu vidéo d'aventure développé par BlueTwelve Studio et édité par Annapurna Interactive.",
    descBis: "Jeu d'aventure, Jeu de plates-formes, Jeu vidéo indépendant, Jeu vidéo de réflexion, Jeu vidéo de simulation",
    img: "imgs/Stray.png",
},
{
    id: "sthssdssfgh",
    name: "Forza Horizon 5",
    price: 70,
    desc: "Forza Horizon 5 est un jeu vidéo de course développé par le studio Playground Games et édité par Xbox Game Studios.",
    descBis: "Jeu vidéo de course, Jeu vidéo de simulation, Jeu d'aventure, Jeu d'action.",
    img: "imgs/ForzaHorizon5.jpg",
},
{
    id: "ssadfg",
    name: "Far Cry 6",
    price: 75,
    desc: "Far Cry 6 est un jeu vidéo de tir à la première personne, d'action-aventure développé par le studio Ubisoft Toronto et édité par Ubisoft.",
    descBis: "Jeu de tir à la première personne, Jeu d'aventure.",
    img: "imgs/FarCry6.jpg",
},
{
    id: "ssadhgfg",
    name: "Ghost of Tsushima",
    price: 80,
    desc: "Ghost of Tsushima est un jeu vidéo d'action en monde ouvert développé par Sucker Punch et édité par Sony.",
    descBis: "Jeu vidéo de rôle, Jeu d'infiltration, Jeu de combat, Jeu de tir, Jeu d'action-aventure.",
    img: "imgs/GhostofTsushima.jpg",
},
{
    id: "ssadfgc",
    name: "Assassin's Creed Valhalla",
    price: 51,
    desc: "Assassin's Creed Valhalla est un jeu vidéo d'action-aventure et de rôle, développé par Ubisoft Montréal et édité par Ubisoft.",
    descBis: "Jeu d'aventure, Jeu de combat, Action-RPG, Jeu de tir, Jeu de plates-formes.",
    img: "imgs/AssassinsCreedValhalla.jpg",
},
{
    id: "asdfiu",
    name: "Red Dead Redemtion II",
    price: 60,
    desc: "Red Dead Redemption II est un jeu vidéo open world, développé par Rockstar Studios et édité par Rockstar Games.",
    descBis: "Monde ouvert, Jeu de tir, Divertissement, Western.",
    img: "imgs/RedDeadRedemption2.jpg",
}]


// Panier dans le quel on stock l'id du produit selectionne par le cilent, et le nbr de selections

let panier = [];


//Cards generator 

let generateShop = () => {
    return (shop.innerHTML = shopItemsD.map((x)=>{ //on return l'affectation de la fonction creatrice des cards a notre div#shop
        
        //on utilise la methode .map() pour parcourir notre tableau d'objets, et recreer (return) un tableau d'objets avec les modifications qu'on souhaite 
        let {id, name, price, desc, img} = x // x = shopItemsD[i] / destructuring (nous evite d'ecrire x. avant chaque propriete)

        //on return du JSX pour ajouter notre contenu html 
        //on utilise l'id unique de chaque objet sur la div.quantity pour pouvoir cibler chaque increment ou decrement de produit unique
        return `
            <div class="item" id="item-id-${id}">
                <img width="300" height="300" src="${img}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-btns">
                        <h2>$ ${price}</h2>
                        <div class="btns">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">0</div> 
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""))//on utilise la methode join() suivie de la methode map() pour concatener les elements du tableau et supprimer l'apostrophe (`) de l'affichage en l'a remplacant par ce qui est mentionne en parametre )
    
}
generateShop()


//Increment & decrement functions

let increment = (id) => { 
    // selectedItem = id = ${id} = ( ${x.id}(sans destructuring) )
    let selectedItem = id 

    //on detecte est-ce-que un produit a l'id unique existe deja ou non dans notre panier 
    let search = panier.find((x)=> x.id === selectedItem.id ); 

    //dans le panier on increment le nbr de item, au lieux de cree a chaque increment (clique) un nouvel objet dans panier 
    search ? search.item += 1 : panier.push({id: selectedItem.id, item: 1}) 

    //on ulpdate le visuel de la selection du client (increment)
    update(selectedItem) 

    redIcon()

    //on genere le cart du cilent selon sa selection
    generateCartShop()

    //on affiche la note total a payer en fonction de la selection du client
    totalAmount()

};

let decrement = (id) => {
    // selectedItem = id = ${id} = ( ${x.id}(sans destructuring) )
    let selectedItem = id 

    //on detecte est-ce-que un produit a l'id unique existe deja ou non dans notre panier 
    let search = panier.find((x)=> x.id === selectedItem.id );

    //on gere le decrement en diminuant le nbr de item, quand le produit n'existe plus dans le tableau panier (item : 0) on affiche une alert
    search === undefined ? alert("Cet article n'est plus dans votre panier") : search.item -= 1 

    //on ulpdate le visuel de la selection du client (decrement)
    update(selectedItem)

    redIcon()

    totalAmount()

    panier = panier.filter((x) => x.item !== 0)
    generateCartShop()
    
};


/*Cart generator*/

let generateCartShop = () => {
    
    (cartShop.innerHTML = 

    //on parcourt notre tableau panier et on le return avec nos modifications souhaitees.
    panier.map((x) => {
        let {id, item } = x 

        //on cherche la correspondance d'id des produits, entre le tableau panier et le tableau data, pour return l'affichage (titre, img, desc...) correspondant.
        let search = shopItemsD.find((y) => y.id === id ) 
        return `
            <div class="itemCards" id="cartItem-${id}">
                <img width="185" height="70" src="${search.img}" alt="img">
                <h3>${search.name}</h3>
                <p>${search.descBis}</p>
                <h1>$ ${search.price * item}</h1>
                <i onclick="deleteProduct(${id})" class="fa-solid fa-x"></i>
            </div>
        `
    })

    //on supprime le bug d'affichage du return litteral (`)
    .join(""))
        
}


//Update visual increse/decrease nbr on cards

let update = (id) => {
    let selectedItem = id

    //on cherche le correspondance des ids entre le tab panier et tab de data
    let search = panier.find((x) => x.id === selectedItem.id )

    //on inject a la div (chagee d'afficher la quantite) le nbr de produit selectionne qui se trouve dans le tab panier
    selectedItem.innerHTML = search.item
};


//update visual increse/decrease nbr on red icon basket

let redIcon = () => {
    let Icon = document.getElementById("cart-icon-amount")
    Icon.innerHTML = panier.map( (x) => x.item).reduce((prevNbr,nextNbr) => prevNbr + nextNbr, 0 )
}



let displayHideCart = () => {
    if (cart.style.display == "block") {
        cart.style.display = "none"
    } else {
        cart.style.display = "block"
    }
    //console.log("hello")
}


let deleteProduct = (id) => { 
    selectedItem = id
    //console.log(selectedItem.id)
    panier = panier.filter((x) => x.id !== selectedItem.id)
    generateCartShop()
    totalAmount()
    //update(id)
    
}



//calcule de la note total a payer 

let totalAmount = () => {
    if (panier.length > 0) {
        let totalBill = panier
            .map((x) => {
                let {id, item} = x;
                let search = shopItemsD.find((y) => y.id === id)
                return search.price * item
            })

            //on fait la somme des valeurs (qu'a return la methode .map() dans un tableau)
            .reduce((x,y) => x + y, 0)
        //console.log(totalBill)

        //on inject le resultat dans la span chargee d'afficher la note totale
        billSpan.innerHTML = `$ ${totalBill}`
    }
    
}