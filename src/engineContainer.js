import React from 'react';
import Engine from './engine'
import Slider from './slider'
export default class EngineContainer extends React.Component{

    state={
        xRotate :0,
        yRotate:0
    }

    setVariable=(name, value)=>{
       
       name==="xRotate" ? this.setState({xRotate: value}) : this.setState({yRotate: value})
    }
    render(){
        return(
            <div>
        <Engine xRotate= {this.state.xRotate} yRotate={this.state.yRotate}></Engine>
        <p>X Rotation</p><Slider direction="x" setVariable= {this.setVariable} ></Slider>
        <br></br>
        <p>Y Rotation</p><Slider direction= "y" setVariable= {this.setVariable}></Slider>
            </div>
        )
    }
}