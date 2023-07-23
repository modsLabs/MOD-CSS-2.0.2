const search_all = document.querySelector('#search_all')
const table = document.querySelector('#table')
const radio = document.querySelectorAll('[name="filter"]')

//others funct
var rows = table.rows
var matching = (substr, str)=>{
str = str.toLowerCase()
substr = substr.toLowerCase()
var abrv = str.startsWith(substr.split('')[0])? substr.split(''): []

//on compare
for (var e = 0; e < abrv.length; e++) {        
    if(!str.includes(abrv[e])){
        return false
    }
    else {
        if(e == abrv.length-1) return true   
    }
}
}
var checked = function(){
for (r of radio){
    if (r.checked) return r.id.replace("os", "")
}
}

//search input MIDDLE
search_all.addEventListener('input', (e)=>{
var s = e.target.value
var x = parseInt(checked()) // retourne le numero de column sur laquelle faire la recherche

//get cells + rows
for(var i = 1; i < rows.length; i++) {
    var r = rows[i]
    r.classList.remove("hide__", "shw__")

    if (s!== ''){ // all reactive tous les filtres

        var col = r.cells[x].innerText 
        s = x==3? ':'+ s : s //si colonne 4 mod attribute, on ajoute :

        if (matching(s, col)){
            r.classList.add("shw__")
        }
        else {
            r.classList.add("hide__")
        }
    }
    else {
        r.classList.remove("hide__", "shw__")
    }
}
})
search_all.addEventListener('search', (e)=>{
for(var i = 1; i < rows.length; i++) {
    var r = rows[i]
    r.classList.remove("hide__", "shw__") //reactive tous les filtres
}
})
