import React from 'react';

const NewsCard = (props) => {

    let { author, title, description, url, urlToImage, publishedAt } = props.article;
    let k = props.i;
    k = k + 1;



    return (
        <div>

            <div className="card my-2 " >
                <img className="card-img-top" src={urlToImage ? urlToImage : 'https://techcrunch.com/wp-content/uploads/2019/09/AP_19269499990748.jpg?w=600'} alt="Card image cap" />
                <div className="card-body" style={{ backgroundColor: '#f5f5f5' }}>
                    <h5 className="card-title">{title}</h5>
                    <div className="card-text"> <a href={url} target="_blank" style={{ color: 'black', textDecoration: 'none' }}>{description}...</a></div>
                    <div><small className="text-muted"> {author ? author : 'Unknown'} </small></div>
                    <div> <small className="text-muted">  {new Date(publishedAt).toGMTString()} </small></div>
                    <p className="mt-3 " > <a href={url} target="_blank" style={{ color: "blue", fontSize: "14px", textDecoration: 'none' }} >Read More</a> <small style={{ marginRight: "12px", right: '0', position: 'absolute' }} className="text-muted" > {k} </small></p>
                </div>
            </div>
        </div>
    );
}
export default NewsCard;