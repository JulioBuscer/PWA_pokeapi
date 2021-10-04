import React from 'react'
import Principal from './Principal'
import Lateral from './Lateral'

const Container = () => {
    return (
        <section className="container-fluid ">
            <div className="row">
                <div className="col ">
                    <Principal/>
                </div>
                <div className="col-3 bg-pkdx-color ">
                    <Lateral />
                </div>
            </div>
            <br />
            <br />
        </section>
    )
}

export default Container
