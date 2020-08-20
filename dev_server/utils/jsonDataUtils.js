
// const fs = require('fs');

// const getSection = () => {}
// const addSection = (jsonDataSource,newSection) => {
//     console.log('SEKCE SEM TU')
//     let sections = jsonDataSource.sections || []
//     let countOfSections = sections.length
//     sections.push({...newSection,id:countOfSections+1})
//     jsonDataSource.sections=sections;
//     console.log('SEKCE: ',sections, 'SOURCE: ',jsonDataSource)
//     return jsonDataSource
// }

// const updateSection = (jsonDataSource,section) => {
// jsonDataSource.sections.find(item => {
//     if(item.id === section.id) {
//         return item.name = section.name
//     }else{
//         return undefined
//     }
// })
// return jsonDataSource
// }

// const removeSection = (jsonDataSource,section) => {
//     console.log('PRED: ', jsonDataSource, section)
//     const newArr = []
//     jsonDataSource.sections.map(item => {
//         if(item.id!==section.id){
//             newArr.push(item)
//         }
//         return newArr
//     })

//     console.log('PO: ',newArr)

//     jsonDataSource.sections=newArr;
//     return jsonDataSource
// }

// const getCategory = () => {}
// const addCategory = () => {}
// const updateCategory = () => {}
// const removeCategory = () => {}

// const saveJSONToFile = (data,filePath) => {
//     fs.writeFile(filePath, JSON.stringify(data),err => {if(err) return console.log(err);console.log("JSON SAVED TO A DISK")})
// }


// module.exports.saveJSONToFile=saveJSONToFile
// module.exports.getSection=getSection
// module.exports.addSection=addSection
// module.exports.updateSection=updateSection
// module.exports.removeSection=removeSection
// module.exports.getCategory=getCategory
// module.exports.addCategory=addCategory
// module.exports.updateCategory=updateCategory
// module.exports.removeCategory=removeCategory

const fs = require('fs')

const saveJSONToFile = (filePath,data) => {
         fs.writeFile(filePath, JSON.stringify(data),err => {if(err) return console.log(err);console.log("JSON SAVED TO A DISK")})
    }

    module.exports.saveJSONToFile=saveJSONToFile