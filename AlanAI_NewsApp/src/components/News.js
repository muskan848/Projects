import React from 'react';
import NewsCard from './NewsCard';


const infoCards = [
    { color: '#0d5866', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me  news from CNN' },
];


const News = ({ articles, a }) => {

    //  var data = Array.from(props.data);

    if (!articles.length) {
        return (<>

            <div className="row imge" style={{ display: "flex", margin: "45px" }}>
                {infoCards.map((infoCard) =>
                (
                    <div key={infoCard.title} style={{ backgroundColor: infoCard.color, height: '16em', width: '325px', color: "white", fontSize: "22px", margin: "15px", borderRadius: "15px" }} className="card my-4 col-3">
                        <div className="card-body">
                            <h4 className="card-title" style={{ fontSize: "28px", marginBottom: "15px", fontWeight: "bolder" }} >{infoCard.title}</h4>
                            <div className="card-text">{infoCard.info ? <div><strong> {infoCard.title.split(' ')[2]}:</strong><br></br> {infoCard.info}</div> : <div><br></br><br></br><br></br><br></br></div>}</div>
                            <div style={{ MarginBottom: '10px', position: "absolute" }} >
                                <hr></hr>
                                <div >Try Saying:<p>{infoCard.text}</p></div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div></>
        );
    }



    return (
        <div className="container">
            <div className="row">
                {articles.map((article, i) =>
                (
                    <div className="col-md-3" key={i} >
                        <NewsCard article={article} i={i} />
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default News;
