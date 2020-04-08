const app = new Vue({
    el: "#app",
    data: {
        logoAtivo: false,
        editTitle: false,
        moved: false,
        movendo: {},
        document: {
            "title": 'Apresentação sem título'
        },
        x: 0,
        y: 0,
        edita: {"fontSize": null},
        editandoOb: 0,
        edited: false,
        slides: [
            {
                "objects": [
                ]
            }
        ],
        editb: [
            {
                "type": 'newSlide',
                "hover": 'Adicionar novo slide',
                "class": 'plus'
            },
            {
                "type": 'h1',
                "hover": 'Caixa de texto',
                "class": 'text'
            },
            {
                "type": 'image',
                "hover": 'Adicionar imagem',
                "class": 'imag'
            }
        ],
        hoverEdit: {},
        slideAtual: 0,
        xA: 0,
        yA: 0,
        hoverEditCond: false
    },
    mounted(){
    window.addEventListener('keydown', (e) => {
        this.deleteObject(e.key)
    });
   },
    methods: {
        editarTitle(){
            this.editTitle = true
        },
        mudarSlide(slide){
            this.edited = false
            this.edita = {"fontSize": null}
            setTimeout(() => {
                this.slideAtual = this.slides.indexOf(slide)
            }, 200);
        },
        updateTitle(){
            if(this.document.title.length >= 1){
                console.log("Insira algo")
            } else{
                this.document.title = 'Apresentação sem título'
            }
            this.editTitle = false
            document.title = this.document.title
        },
        mover(ob){
            if(!this.edited){
            this.moved = true
            this.movendo = ob
            }
        },
        soltar(){
            if(this.moved){
            const object = this.slides[this.slideAtual].objects.find(e => e == this.movendo)
            if(object){
                const id = this.slides[this.slideAtual].objects.indexOf(object)
                this.slides[this.slideAtual].objects[id].x = this.x
                this.slides[this.slideAtual].objects[id].y = this.y
            } 
        }
        },
        soltei(){
            this.moved = false
        },
        edit(ob){
            this.edita = ob
            this.editandoOb = this.slides[this.slideAtual].objects.indexOf(ob)
            this.edited = true
        },
        endEdit(ob){
            const object = this.slides[this.slideAtual].objects.find(e => e == ob)
            if(object){
                const id = this.slides[this.slideAtual].objects.indexOf(object)
                if(this.slides[this.slideAtual].objects[id].title.length >= 1){
                    console.log("Insira algo")
                } else{
                    this.slides[this.slideAtual].objects[id].title = 'Insira um título'
                }
                this.edited = false
            }
            this.edita = {"fontSize": null}
        },
        deleteObject(e){
            if(this.edited){
            if(e == 'Delete'){
                const object = this.slides[this.slideAtual].objects.find(e => e == this.edita)
                if(object){
                    const id = this.slides[this.slideAtual].objects.indexOf(object)
                    this.slides[this.slideAtual].objects.splice(id, 1)
                }
            }
        }
        },
        addObject(who){
            if(who.type == 'h1'){
            const object = {
                "id": this.slides[this.slideAtual].objects.length,
                "type": who.type,
                "title": 'Insira algo',
                "x": 10,
                "fontSize": 52,
                "src": null,
                "y": 10
            }
            this.slides[this.slideAtual].objects.push(object)
            } else if(who.type == 'newSlide'){
                this.edited = false
                this.edita = {"fontSize": null}
                setTimeout(() => {
                    this.slides.push({
                        "id": this.slides.length,
                        "objects": []
                    }) 
                }, 200);
                this.slideAtual = this.slides.length - 1
            } else if(who.type == 'image'){
                const object = {
                    "id": this.slides[this.slideAtual].objects.length,
                    "type": who.type,
                    "src": 'https://www.pinclipart.com/picdir/middle/142-1429444_blank-book-clipart-wow-gif-transparent-png-download.png',
                    "x": 20,
                    "y": 20,
                    "width": 200,
                    "height": 200
                }
                this.slides[this.slideAtual].objects.push(object)
            }
        },
        hover(icon){
            this.hoverEdit = icon
            this.hoverEditCond = true
        },
        endEditImg(ob){
            const object = this.slides[this.slideAtual].objects.find(e => e == ob)
            if(object){
                const id = this.slides[this.slideAtual].objects.indexOf(object)
                if(this.slides[this.slideAtual].objects[id].src.length >= 1){
                    console.log("Insira algo")
                } else{
                    this.slides[this.slideAtual].objects[id].src = 'https://www.pinclipart.com/picdir/middle/142-1429444_blank-book-clipart-wow-gif-transparent-png-download.png'
                }
                this.edited = false
            }
        }
    }
})

document.querySelector('body').addEventListener('mousemove', function(event) {
    const posicaoReal = $("#board").offset();
    const localx = (event.clientX - posicaoReal.left) - 15;
    const localy = (event.clientY - posicaoReal.top) - 15;
    app.x = localx;
    app.y = localy;
    app.xA = event.clientX - 50;
    app.yA = event.clientY + 15;
});
