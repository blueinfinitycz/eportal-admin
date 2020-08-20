const express = require('express');
const router = express.Router();
const authorize = require('../../authorization')
const data = require('./data.json')
const jsonModule = require('../../utils/jsonDataUtils');


router.post('/getJSONData', authorize.verifyCookie(), (req, res)=>{
    // console.log("VOLANO: ",JSON.stringify(data))
    res.send(JSON.stringify(data))
})

router.post('/addJSONData', authorize.verifyCookie(), (req, res)=>{
    const sendedData = JSON.parse(req.body.data)
    const idRnd = Math.floor(Math.random()*.8*1000)

    switch(sendedData.type) {
        case "add-section": data.sections.push({name:sendedData.txt,id:idRnd,order:+data.sections.length+1});break;
        case "add-category":

        let searchedSection = data.sections.find(item => item.id === +sendedData.id)
        let categories = searchedSection.categories || []
            categories[categories.length]={name:sendedData.txt,id:idRnd,order:categories.length+1,description:sendedData.descr}
       searchedSection.categories=categories

        break;
        case "add-carousel": 
        const [sectionId, categoryId] = sendedData.id.split(",")
        // console.log(`SECTION ID: ${sectionId}: CATEGORY ID: ${categoryId}`); // [ 'imgData', 'description', 'type' ]
        console.log("ADD CAROUSEL ID: ",JSON.stringify(sendedData.id), sendedData.descr)

        let searchedSectionForCarousel = data.sections.find(item => item.id === +sectionId)
        let searchedCategoryForCarousel = searchedSectionForCarousel.categories.find(item => item.id=== +categoryId)
        let carousel = searchedCategoryForCarousel.carousel || []
            carousel[carousel.length] = {
                id:idRnd,
                order:carousel.length+1,
                description:sendedData.descr,
                imgBase64:sendedData.imgData
            }
            searchedCategoryForCarousel.carousel = carousel
        
        break;

    }
    // jsonModule.saveJSONToFile('/data.json',data) // for linux docker container 
    jsonModule.saveJSONToFile(`${__dirname}/data.json`,data) // for windows 
    res.send('ok')
})

router.post('/updateJSONData', authorize.verifyCookie(), (req, res)=>{
    const sendedData = JSON.parse(req.body.data)
    switch(sendedData.type) {
        case "update-title": ;
             data.pageTitle=sendedData.txt;
        break;
        case "update-subtitle" :
             data.pageSubtitle=sendedData.txt;
             break;
        case "update-section": data.sections.map(item => item.id=== +sendedData.id ? item.name=sendedData.txt : "");break;
        case "update-category":
        const [sectionId, categoryId] = sendedData.id.split(',') //id: '536,243'
            // console.log("UPDATE CATEGORY: ", JSON.stringify(sendedData))
        data.sections.map(section => {
            if(section.id===+sectionId){
                section.categories.map(item => {

                    if(item.id=== +categoryId){
                        
                        if(sendedData.txt !== ""){
                            item.name=sendedData.txt
                        }

                        if(sendedData.descr !=="") {
                             item.description=sendedData.descr
                        }
                    }

                    return
                }
                )

                }
            })

        break;
        case "update-carousel": 
        const [sectionIdForCarousel, categoryIdForCarousel, carouselSlideId] = sendedData.id.split(",")
        let searchedSectionForCarousel = data.sections.find(item => item.id === +sectionIdForCarousel)
        let searchedCategoryForCarousel = searchedSectionForCarousel.categories.find(item => item.id=== +categoryIdForCarousel)
        searchedCategoryForCarousel.carousel.map(item => {
            if(item.id === +carouselSlideId) {

                if(sendedData.descr !== "") {
                    item.description=sendedData.descr;
                }

                if(sendedData.imgData!==""){
                    item.imgBase64= sendedData.imgData;
                }
                
             }
             return
            }
             
             )
        break;
    }

    // jsonModule.saveJSONToFile('/data.json',data) // for linux docker container 
    jsonModule.saveJSONToFile(`${__dirname}/data.json`,data) // for windows
    res.send("ok")
})

router.post('/removeJSONData', authorize.verifyCookie(), (req, res)=>{
    const sendedData = JSON.parse(req.body.data)
    console.log("REMOVE :", sendedData)

    switch(sendedData.type) {
        case "remove-section": data.sections=data.sections.filter(item => item.id!== +sendedData.id);break;
        case "remove-category":
            console.log("REMOVE CATEGORY: ", sendedData); // { type: 'remove-category', id: '536,243' }
            const [sectionId, categoryId] = sendedData.id.split(',')
            data.sections.map((section,sectionIndex) => 
            {
              if(section.id===+sectionId){
                section.categories.filter(item => item.id===+categoryId)
                 data.sections[sectionIndex].categories= section.categories.filter(item => item.id !== +categoryId)
                }
             }
           )
            
            
            break;
        case "remove-carousel":
            
            const [sectionIdForCarousel, categoryIdForCarousel, carouselSlideId] = sendedData.id.split(",")
            
            let searchedSectionForCarousel = data.sections.find(item => item.id === +sectionIdForCarousel)
            
        let searchedCategoryForCarousel = searchedSectionForCarousel.categories.find(item => item.id=== +categoryIdForCarousel)
        const updateedCarouselArr = searchedCategoryForCarousel.carousel.filter(item => item.id !== +carouselSlideId)
        searchedCategoryForCarousel.carousel=updateedCarouselArr
            break;
    }
    // jsonModule.saveJSONToFile('/data.json',data) // for linux docker container 
    jsonModule.saveJSONToFile(`${__dirname}/data.json`,data) // for windows
    res.send("ok")
})


module.exports=router;