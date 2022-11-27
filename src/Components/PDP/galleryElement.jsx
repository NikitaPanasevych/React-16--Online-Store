import React from "react"

export default class GalleryElement extends React.Component{

    changeImage = () => {
        this.props.changeImage(this.props.id)
    }

    render(){
        return(
            <>
                <img className=" GalleryElement" onClick={this.changeImage} src={this.props.src} />
            </>
        )
    }
}