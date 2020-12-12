import React from 'react'
import Section from '../Section/Section'
import FanioContext from '../FanioContext'

export default class Installment extends React.Component{

    static contextType = FanioContext

    getType = () => {
        return this.context.typeList.find(type => type.id === this.props.typeId)
    }


    //make objects have list word in them
    getSections(){
        // console.log(this.context[`${this.getType().sectionName}List`])
        return this.context[`${this.getType().sectionName}List`]
        .filter(section => {
            return section.installmentId === this.props.id
        })
        .map(section => {
            // console.log(section)
          return <Section key={section.id} {...section} type={this.getType()} />
        })
      }


    render() {
        return (
          <div className="fandom-view">
            <h4>{this.props.title}</h4>
            {this.getSections()}
          </div>
        );
      }
}