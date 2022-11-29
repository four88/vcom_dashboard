import React from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import flowChart from '../../images/flowchart_datapipeline.png';
import azure from '../../images/azure_key.png';

export default function Documentation() {

  const codes = [`def scrape_by_geo(keywords, geocode,since,until, outfile):
    c = twint.Config()
    c.Search = keywords #search keyword c.Since = since
    c.Until = until
    c.Limit = 50000
    c.Geo = geocode
    c.Store_json = True
    c.Output = "output/" + outfile
    c.Hide_output = True
    c.Count = True
    c.Stats = True
    c.Lang = 'en'
    twint.run.Search(c)`
    ,
    `def twint_loop(searchterm, geocode, since, until):
    dirname = clean_name("spain") # create folder in output folder
    try:
    # Create target Directory
        chdir('output') 
        mkdir(dirname)
        print("Directory" , dirname ,  "Created ")
    except FileExistsError:
        print("Directory" , dirname ,  "already exists")

    daterange = pd.date_range(since, until)

    for start_date in daterange:

        since= start_date.strftime("%Y-%m-%d")
        until = (start_date + timedelta(days=1)).strftime("%Y-%m-%d")

        json_name = '%s.json' % since
        json_name = path.join(dirname, json_name)

        print('Getting %s ' % since )
        scrape_by_geo(searchterm,geocode, since, until, json_name)
`,
    `import pandas as pd
import numpy as np
import re
import emoji
import nltk
from glob import glob
from os import mkdir, path

nltk.download('words')
words = set(nltk.corpus.words.words())

file_names = glob(path.join('spain','*.json')) # edit folder name to folder that you want to covert all JSON file to CSV
dfs = [pd.read_json(fn, lines = True) for fn in file_names]
tweet_df = pd.concat(dfs)


# cleaner function for remove @ sign, http linke, Emoji and # sign
def cleaner(tweet):
    tweet = re.sub("@[A-Za-z0-9]+","",tweet) #Remove @ sign
    tweet = re.sub(r"(?:\@|http?\://|https?\://|www)\S+", "", tweet) #Remove http links
    tweet = " ".join(tweet.split())
    tweet = ''.join(c for c in tweet if c not in emoji.distinct_emoji_list(c)) #Remove Emojis
    tweet = tweet.replace("#", "").replace("_", " ") #Remove hashtag sign but keep the text
    tweet = " ".join(w for w in nltk.wordpunct_tokenize(tweet) 
         if w.lower() in words or not w.isalpha())
    return tweet


# df = pd.read_csv('output/tweets_eu&uk_dataset.csv') #read file 

tweet_df = tweet_df[['user_id','username', 'date', 'tweet']]

tweet_df['tweet'] =tweet_df['tweet'].map(lambda x: cleaner(x))

tweet_df['tweet'] = tweet_df['tweet'].astype("string")

tweet_df.info()

nan = float("NaN")
tweet_df.replace("",nan, inplace=True)
tweet_df.dropna(subset=['tweet'],inplace=True)

tweet_df.to_csv('tweets_spain_cleaned_dataset.csv') # edit output filename. Change spain to your country working on.`
    , `subscription_key = '<YOUR_SUBSCRIPTION_KEY>'
headers = {"Ocp-Apim-Subscription-Key": subscription_key}
endpoint = "<YOUR_ENDPOIN_URL>"

sentiment_url = endpoint + "/text/analytics/v3.0/sentiment"`
    , `subscription_key = '<YOUR_SUBSCRIPTION_KEY>'
headers = {"Ocp-Apim-Subscription-Key": subscription_key}
endpoint = "<YOUR_ENDPOIN_URL>"
keyphrase_url = endpoint + "/text/analytics/v3.0/keyphrases"`
    , `import pandas as pd

df = pd.read_csv('tweets_spain_cleaned_dataset.csv') # select file that your want to split

half_df =len(df) // 2


def split_dataframe_by_position(df, splits):
    """
    Takes a dataframe and an integer of the number of splits to create.
    Returns a list of dataframes.
    """
    dataframes = []
    index_to_split = len(df) // splits
    start = 0
    end = index_to_split
    for split in range(splits):
        temporary_df = df.iloc[start:end, :] dataframes.append(temporary_df)
        start += index_to_split
        end += index_to_split
    return dataframes

split_dataframes = split_dataframe_by_position(df, 2)
print(split_dataframes[0])

split_dataframes[0].to_csv('tweets_spain_cleaned_dataset_1.csv') # first half of data
split_dataframes[1].to_csv('tweets_spain_cleaned_dataset_2.csv') # second half of data`
    , `import pandas as pd


# read first half CSV file
df1 = pd.read_csv('spain_sentimentCombinedResult_1.csv')

# read second half CSV file
df2 = pd.read_csv('spain_sentimentCombinedResult_2.csv')

frames= [df1,df2]

result = pd.concat(frames)

# export into one CSV file
result.to_csv('spain_sentimentCombinedResult.csv')`
  ]


  return (

    <article className="docs">

      <section className="docs__section">
        <h2 className="docs__heading">Twitter Sentiment and Text Analsis with Azure Cognitive Service</h2>
        <p className="docs__content">
          This project aims to determine the impact of climate change on human well-being
          with a focus on flooding. During the course of this project, sentiment and text
          analysis are being undertaken using Phyton and Microsoft Azure cognitive services
          to find out people’s emotions, feelings and opinions caused by this disaster.
        </p>
      </section>

      <img src={flowChart}
        alt="flow-chart"
        className='docs__img'
      />

      <section className="docs__section">
        <h2 className="docs__heading">
          Data Pipeline:
        </h2>
        <ul className="docs__lists">
          <li className="docs__list">Data collection from Twitter</li>
          <li className="docs__list">Data cleansing</li>
          <li className="docs__list">Sentiment analysis (using Azure Cognitive Service)</li>
          <li className="docs__list">Result Categorisation (Positive, Negative, Neutral)</li>
        </ul>
      </section>

      <section className="docs__section">
        <p className="docs__content">
          The first step is to query and cleanse the tweets on Twitter, such as deleting the duplicate data, the link, @ sign and hashtag sign. This is because all those elements will make the result of sentiment analysis inaccurate. Following this step, using Azure Cognitive service API to analyse all the tweets. After obtaining the result, all the information must be analysed before moving to the keyphrases extraction stage. The next step is to separate sentiment results into four groups that are 1. Positive 2. Negative 3. Neutral 4. Mixed. After that, using keyphrases extraction from Azure cognitive service API to extract the keyword of each group. Finally, analyse the results and create the dashboard on Power BI.
        </p>
      </section>

      <section className="docs__section">
        <h2 className="docs__heading">Prerequisite</h2>
        <p className="docs__content">
          To start the implementation, the Azure account is required. After that, create the resource group. Then generate Language service as part of the Cognitive service since it is crucial in the Sentiment Analysis and Keyphrases Extraction stage.
        </p>
      </section>

      <section className="docs__section">
        <h2 className="docs__heading">Data Collection and Cleansing</h2>
        <h3 className="docs__bold">With out a Twitter API token(Using Twint)</h3>
        <p className="docs__content">
          If the Twitter API token is not accessible, the Twint library can be used instead. However, there is some negative point using Twint, and this is because Twint does not allow querying the tweets on the specific location name. But using the geographic code (Longitude, Latitude) can also be utilised to search for the location. The recommendation to use this website to look for the geographic code<br />
          <a href="https://www.mapdevelopers.com/draw-circle-tool.php"
            className='docs__link'
          >
            Link to geographic code tools
          </a>
        </p>
        <p className="docs__content">
          To set the required number on <code className='docs__code'>c. Limit</code>, the number can be found on line 12 of
          <code className='docs__code'>queryTweetsTwint.py </code>
          or line 5 on below code block.
        </p>
        <CodeBlock
          code={codes[0]}
          lang='python'
        />
        <p className="docs__content">
          The next step is to edit the name of the directory folder. All the tweets that query from Twitter will be located in this folder.
          It is important to note that the folder’s name must relate to the country that will query the tweet. For instance, if the country that will be queried is Spain, the folder’s name should be Spain.
        </p>
        <CodeBlock
          code={codes[1]}
          lang='python'
        />
        <p className="docs__content">
          After setting the target dictionary folder, the tweet query function needs four parameters.
        </p>
        <ul className="docs__lists">
          <li className="docs__list">Keyword</li>
          <li className="docs__list">Geographic code</li>
          <li className="docs__list">Starting date</li>
          <li className="docs__list">Ending date</li>
        </ul>
        <p className="docs__content">
          Finally, run the below command to run the script file.
        </p>
        <CodeBlock
          code={`$ python3 queryTweetNoApi.py`}
          lang='shell'
        />
        <p className='docs__content'>
          The JSON file will appear in “output/YOUR-FOLDER_NAME”. Next is to open <code className="docs__code">cleanData.py</code> in the output folder with the text editor. Then edit line 12 of the folder name collected from the JSON files and the output filename on the final line of the code.
        </p>
        <CodeBlock
          code={codes[2]}
          lang='python'
        />
        <p className='docs__content'>
          After that, run this below command on your terminal to run this file This file will convert all the JSON files to one CSV file. And clean all the data remove @ sign, http linke, Emoji and # sign also delete deplication data. Now you will get CSV file that ready for next step there is Sentiment Analysis
        </p>
        <CodeBlock
          code={`$ python3 cleanData.py`}
          lang='shell'
        />
      </section>

      <section className="docs__section">
        <h2 classsName="docs__heading">
          Sentiment Analysis
        </h2>
        <p className="docs__content">
          This step is to use Azure cognitive service for Sentiment analysis. There is a need to create an Azure account to create a cognitive service (Language Service) on Azure. Then the endpoint URL and keys will appear to connect to the service.
        </p>
        <img
          src={azure}
          className="docs__img_azure"
        />
        <p className='docs__content'>
          To connect to the Sentiment analysis Azure, add <code className='docs__code'>ENDPOINT</code> and <code className='docs__code'>KEYS</code> in <code className='docs__code'>sentiment.py</code>
        </p>
        <CodeBlock
          code={codes[3]}
          lang='python'
        />
        <p className='docs__content'>
          Then run <code className='docs__code'>sentiment.py</code>
        </p>
        <CodeBlock
          code={`$ python3 sentiment.py`}
          lang="shell"
        />
        <p className='docs__content'>
          After run this script, You will get <code className='docs__code'>sentimentResult.csv</code>
          This table contain 4 columms
        </p>
        <ul className='docs__lists'>
          <li className='docs__list'>Sentiment result</li>
          <li className='docs__list'>Number of positive words</li>
          <li className='docs__list'>Number of negative words</li>
          <li className='docs__list'>Number of neutral words</li>
          <li className='docs__list'>Number of mixed words</li>
        </ul>
        <p className='docs__content'>
          The next step is to combine <code className='docs__code'>sentimentResult.csv</code>  with <code className='docs__code'>tweetCleanedNoApi.csv</code> by running
          By running <code className='docs__code'>combineResult.py</code>
        </p>
        <CodeBlock
          code={`$ python3 combineResult.py`}
          lang="shell"
        />
        <p className='docs__content'>
          Before moving to the next step, the result should appear as <code className='docs__code'>sentimentResultCombined.csv</code>. The file is going to be used to analyse the result of sentiment.
        </p>
      </section>

      <section className="docs__section">
        <h2 className="docs__heading">
          Keyphrases Extraction
        </h2>
        <p className="docs__content">
          After obtaining the sentiment result, separate the result into three groups (positive, negative, neutral) by running
          <code className="docs__code">separateSentimentResult.py</code>
        </p>
        <CodeBlock
          code={`$ python3 seperateSentimentresult.py`}
          lang="shell"
        />
        <p className='docs__content'>
          The output has 4 files
        </p>

        <ul>
          <li className='docs__list'>
            YOUR_COUNTRY_NAME_sentimentResult_Negative.csv
          </li>
          <li className='docs__list'>
            YOUR_COUNTRY_NAME_sentimentResult_Positive.csv
          </li>
          <li className='docs__list'>
            YOUR_COUNTRY_NAME_sentimentResult_Neutral.csv
          </li>
          <li className='docs__list'>
            YOUR_COUNTRY_NAME_sentimentResult_Mixed.csv
          </li>
        </ul>

        <p className='docs__content'>
          Now the Keyphrases are ready. Then, set up the <code className='docs__code'>subscription_key </code>and <code className='docs__code'>ENDPONIT_URL</code>, the same as sentiment analysis.
        </p>
        <CodeBlock
          code={codes[4]}
          lang='python'
        />
        <p className='docs__content'>
          Run the script to get the result of Keyphrases extraction from Azure.
        </p>
        <CodeBlock
          code={`$ python3 keyphrasesExtraction.py`}
          lang='shell'
        />
        <p className='docs__content'>
          Then the CSV file will appear and is ready for analytics
          The table contains ten columns
        </p>
        <ul className='docs__lists'>
          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>created_at </code>
              Time that tweet was created
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>user </code>
              Username of tweet
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>tweet </code>
              tweet text
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>location </code>
              location of tweet
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>sentiment </code>
              sentiment result
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>positive </code>
              Number of positive words
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>negative </code>
              Number of negative words
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>neutral </code>
              Number of neutral words
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>mixed </code>
              Number of mixed words
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>keyPhrases </code>
              list of keywords
            </p>
          </li>

          <li className='docs__list'>
            <p className='docs__content'>
              <code className='docs__code'>keyword </code>
              explode keyPhrases into one word That maens one tweet can have many rows.
            </p>
          </li>
        </ul>
      </section>
      <section className="docs__section">
        <h2 className='docs__heading'>
          Handle error
        </h2>
        <p className='docs__content'>
          In the case of an error occurring while running <code className="docs__code">sentiment.py</code>. The recommendation is to separate the CSV file used for sentiment analysis into two parts before running <code className='docs__code'>sentiment.py</code> using <code className="docs__code">splitDataframe.py</code>. To do so, open the file with the text editor and edit line 3 to the data that wants to be split. Next, move to the last 2 lines of code to edit the output name.
        </p>
        <CodeBlock
          code={codes[4]}
          lang='python'
        />
        <p className='docs__content'>
          Finally, run the below command on the terminal to run the file. The CSV file will appear and is ready to run the Sentiment analysis.
        </p>
        <CodeBlock
          code={`$ python3 splitDataframe.py`}
          lang='shell'
        />
        <p className='docs__content'>
          Notedly, if the user uses <code className='docs__code'>splitDataframe.py</code> before running the Sentiment analysis, then there is the need to use <code className='docs__code'>combineDataframe.py</code> to combine 2 CSV files into 1 CSV file before running <code className='docs__code'>separateResult.py</code>. To do so, open <code className='docs__code'>combineDataframe.py</code> with the text editor, edit line 5 and line 8 of the file that wants to be combined. Then edit the final line of the file name.
        </p>
        <CodeBlock
          code={codes[5]}
          lang='python'
        />

        <p clasName='docs__content'>
          Finally, run the below command on the terminal, and then 1 CSV file will appear.
        </p>
        <CodeBlock
          code={`python3 combineDateframe.py`}
          lang='shell'
        />
      </section>

    </article>

  );
}
