import React from 'react';


export default class Engine extends React.Component {
    state = {
        triangleList: [],
        canvas: "",
        ctx: "",
        height: 0,
        width: 0,
        loop: ""
    }
    componentDidMount() {
        let mainCanvas = document.getElementById("canvas")
        let mainContext = mainCanvas.getContext("2d")
        let canvasWidth = mainCanvas.width
        let canvasHeight = mainCanvas.height
        this.setState({ canvas: mainCanvas, ctx: mainContext, width: canvasWidth, height: canvasHeight, loop: setInterval(this.draw, 3) },()=> {
        //change or remove this method to change what is displayed on launch
        this.addStartShapes();
        //change this line to change where the drawings will be positioned, for demos sake it is set default to the middle
        //removing this will set the origin to the top left corner
        this.state.ctx.translate(this.state.width / 2, this.state.height / 2)
        
        
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.loop)
    }

    addStartShapes = () => {
        let addArray = Triangle.createEqualTetrahedron(100)
        this.setState({ triangleList: this.state.triangleList.concat(addArray) })
    }

    drawTriangle(context, t, matrix){
       let v1= matrix.transformVertex(t.v1, matrix)
       let v2= matrix.transformVertex(t.v2, matrix)
       let v3= matrix.transformVertex(t.v3, matrix)
       context.beginPath()
       context.moveTo(v1.x, v1.y)
       context.lineTo(v2.x, v2.y)
       context.lineTo(v3.x, v3.y)
       context.lineTo(v1.x,v1.y)
       context.fillStyle = 'rgba(0,0,0,0)'
       context.fill()
       context.fillStyle='rgb(0,0,0)'
       context.stroke()
    }

    draw = () => {
        //get current roatation amount and create matrix needed for XZ plane rotation (left to right)
        console.log(this.props.xRotate)
        let heading = this.degreesToRadians(this.props.xRotate)
   
        let transform = new Matrix3([Math.cos(heading),0, -Math.sin(heading),
                                    0,1,0,
                                    Math.sin(heading), 0, Math.cos(heading)])
              
        if (this.state.canvas !== "") {
            this.state.triangleList.forEach(t => {
               this.drawTriangle(this.state.ctx, t, transform)
            })
        }
    }

    degreesToRadians=(deg)=>{
        var pi= Math.PI;
        return deg *(pi/180)
    }
    render() {
        return (
            <div>
                <canvas id= "canvas" height="500" width="500"></canvas>

            </div>
        )
    }
}


class Vertex {

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    
}

class Triangle {
    constructor(v1, v2, v3, color) {
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3
        this.color = color
    }
    //creates an equilateral tetrahedron each side with a different color
    static createEqualTetrahedron = (val) => {
        let result = []


        result.push(new Triangle(new Vertex(val, val, val),
            new Vertex(-1*val, -1*val, val),
            new Vertex(-1*val, val, -1*val),
            "#FFFFFF"))
        result.push(new Triangle(new Vertex(val, val, val),
            new Vertex(-1*val, -1*val, val),
            new Vertex(val, -1*val, -1*val),
            "#FF0000"))
        result.push(new Triangle(new Vertex(-1*val, val, -1*val),
            new Vertex(val, -1*val, -1*val),
            new Vertex(val, val, val),
            "#00FF00"))
        result.push(new Triangle(new Vertex(-1*val, val, -1*val),
            new Vertex(val, -1*val, -1*val),
            new Vertex(-1*val, -1*val, val),
            "#0000FF"))
        return result;
    }
}

class Matrix3{
    constructor(values){
        this.values=values
    }

    multiply=(matrix)=>{
        let result=[]
        for(let row=0; row<3; row++){
            for(let col=0; col<3; col++){
                for (let i=0; i<3; i++){
                result[row *3 +col] += this.values[row *3 +i] * matrix[row*2 +col]
                }
            }
        }
        return new Matrix3(result)
    }

    //takes in a vertex and transforms it based on matrix values
    transformVertex=(vertexIn, values)=>{
        return new Vertex(
            vertexIn.x *values[0] + vertexIn.y*values[3] +vertexIn.z *values[6],
            vertexIn.x *values[1] + vertexIn.y *values[4] + vertexIn.z*values[7],
            vertexIn.x * values[2] + vertexIn.y +values[5] + vertexIn.z *values[8]
        )
    }
}

