import Carousel from 'react-material-ui-carousel'
import { serverPath } from '@utils/urls'

export default function PostCarousel({ images }) {
    return (
        <Carousel
            autoPlay={false}
            navButtonsAlwaysInvisible
            sx={{mt:"1rem"}}
            indicators={images.length > 1 ? true : false}
        >
            {images?.map(i => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    key={i}
                >
                    <img src={serverPath + i} style={{maxHeight:"300px", maxWidth:"300px"}}/>
                </div>
            ))}
        </Carousel>
    )
}