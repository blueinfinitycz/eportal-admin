import React, {useState, useEffect,useRef} from 'react'
import FileBase64 from 'react-file-base64';
import PropTypes from 'prop-types'

const ImageResizer = React.memo(({thumbnailDimensions,imgBase64Data, dataReady}) => {
    const counter =  useRef(0);
    console.log("POCET: ", counter.current++)
    const [imgData, setImgData] = useState(null)
    const [imgDimensions, setImgDimensions] = useState({width:0,height:0})

    const imgDataLoaded = (data) => {
        console.log('BASE64 DATA: ',data)
        setImgData(data[0].base64);
    }

    useEffect(() => {
        // if(imgData!=null) imgBase64Data(imgData);
        if(imgDimensions) console.log(imgDimensions)
        
    },[imgDimensions]) 


    return (
      <div>
        <div>
<FileBase64 multiple={true} onDone={(e)=>imgDataLoaded(e)} />
</div>
        <div
          style={{ width: `${thumbnailDimensions.width}px`, height: `${thumbnailDimensions.height}px`,overflow:'hidden', border: "1px solid #cccccc",marginTop:'10px',display:'flex',alignItems:'center',fontSize: '13px',color:'#cccccc',userSelect:'none', textAlign:'center'}}
        >

          {
              
              imgData === null ? (
                  <div style={{textAlign:'center',width:'100%'}}>100px x 100px</div>)
                : (
                    <img
                    border="none"
                    src={`${imgData}`}
                    onLoad={(e) =>
                      setImgDimensions({
                        width: e.target.naturalWidth,
                        height: e.target.naturalHeight,
                      })
                    }
                    height="100"
                    width="100"
                  />
                )
          }

        </div>
      </div>
    );
})

export default ImageResizer

ImageResizer.propTypes = {
    imgBase64Data:PropTypes.func.isRequired,
}

ImageResizer.defaultProps = {
    thumbnailDimensions : {width:100,height:100},
}