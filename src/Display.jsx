// Display.js

const Display = ({photos}) => {

    return (

        <section>
            { photos.length === 0 ? ( 

                <h2>No photos yet!</h2> 
            
                ) : ( 
                
                <>
                    <h2>Here are your photos</h2>
                    <div className="photos">
                        {photos.map( (photo) => {
                            return (
                                <div className="photoContainer" key={photo.id}>
                                    <img src={photo.urls.small} alt={photo.alt_description} />
                                </div>
                            )
                        } )}
                    </div>
                </>
            
            ) }
        </section>
        

    );

}

export default Display;