function DormCard({name, location, rating}){
    return(
        <div>
            <h2>{name}</h2>
            <p>Location: {location}</p>
            <p>Rating: {rating} / 5</p>
        </div>
    )
}
export default DormCard;