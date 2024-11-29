const textbox = document.querySelector('#textbox')

textbox.oninput = () => {
    let text = textbox.value
    let char = text.length
    document.querySelector('#char').innerHTML = char

    text = text.trim()
    let words = text.split(" ")
    let cleanExtraSpaces = words.filter( ele => ele != "")
    document.querySelector('#word').innerHTML = cleanExtraSpaces.length
}






