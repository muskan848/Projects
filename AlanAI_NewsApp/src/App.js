import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './index.css';
import News from './Components/News';
import wordsToNumbers from 'words-to-numbers';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        alanBtn({
            key: '3f7410d90058995b3c585e128455bc342e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again.');
                    }
                    else if (article) {
                        window.open(article.url, '_blank');
                    }
                    else {
                        alanBtn().playText('Please try that again...');

                    }
                }

            }
        });
    }, []);

    return (
        <div>

            <h1 className="text-center" style={{ color: "black", margin: '35px 0px ', marginTop: '1.5em' }}>Alan AI News Application</h1>
            <News articles={newsArticles} />


        </div>
    );

}
export default App;