export const slugify=(text:string)=>{
    return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-') // Szóközök cseréje kötőjelre
    .replace(/[^\w\-]+/g, '')  // Speciális karakterek eltávolítása    
    .replace(/--+/g, '-') // Dupla kötőjelek javítása
}