import React from 'react'

export default class InstallmentView extends React.Component{

    static contextType = FanioContext

    getType = () => {
        return this.context.typeList.find(type => type.id === this.props.typeId)
    }

    
    getSections(){
        // console.log(this.context[`${this.getType().sectionName}List`])
        const sectionsArray =  this.context[`${this.getType().sectionName}List`]
        .filter(section => {
            return section.installmentId === this.props.id
        })
        .map(section => {
            // console.log(section)
          return <Section key={section.id} {...section} type={this.getType()} />
        })

        sectionsArray.sort((a, b) => a.props.order - b.props.order)
        return sectionsArray
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