// import React from 'react'

// export default class CreateSubList extends React.Component{
//     state = { 
//         orderNumber: 0, 
//         subTitle: ""
//     }

//     handleTitle = (e) => {
//         subTitle = e.target.value
//         this.setState({
//             ...this.state, subTitle
//         })
        
//         this.props.addSub({...this.state, subId: this.props.subId})
//     }

//     handleOrderNumber = (e) => {
//         orderNumber = e.target.value
//         this.setState({
//             ...this.state, orderNumber
//         })
//         this.props.addSub({...this.state, subId: this.props.subId})
//     }

//     render(){
//         return (
//           <React.Fragment>
//             <label for={`subsection-order-${this.props.installId}-${this.props.sectionId}-${this.props.subSectionId}`}>
//               What's the {this.props.type.subName} number?
//             </label>
//             <input onChange={this.handleOrderNumber} type="number" />
//             <label for={`subsection-title-${this.props.installId}-${this.props.sectionId}-${this.props.subSectionId}`}>
//               What's the {this.props.type.subName} title?
//             </label>
//             <input onChange={this.handleTitle} type="text" />
//           </React.Fragment>
//         );
//       }
//     }
