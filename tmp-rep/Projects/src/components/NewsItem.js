import React from 'react';

const NewsItem = (props) => {

    let { title, desc, imageUrl, newsUrl, author, date, source } = props;  //destructuring
    return (

        <div className="card my-4" >
            <div style={{ right: '0', position: 'absolute', display: 'flex' }}>
                <span className=" badge rounded-pill bg-danger" >
                    {source}
                </span>
            </div>
            <img className="card-img-top" src={!imageUrl ? "https://images.cnbctv18.com/wp-content/uploads/2021/01/AP20366363354571-1019x573.jpg" : imageUrl} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <p className="card-text"><small className="text-muted">by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>

    );
}

export default NewsItem;
