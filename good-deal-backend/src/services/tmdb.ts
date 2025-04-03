import axios from "axios";
import dotenv from "dotenv";
import logger from "./logger";

/**
 * TMDB Connection handler service
 */
class TMDBService {
  #apiKey = '';
  #baseUrl = ''
  #axiosInstance;
  
  constructor() {
    dotenv.config(); 

    this.#apiKey = process.env.TMDB_API_KEY ?? "";
    this.#baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

    if (!this.#apiKey) {
      logger.error("TMDB API key is missing from environment variables");
    }

    //Base axios instance with the api key and base url
    this.#axiosInstance = axios.create({
        baseURL: this.#baseUrl,
        params: {
            api_key: this.#apiKey
        }
    })
  }


  //Get current top k movies
  async GetAccessToken(k: Number) {
    logger.info(this.#apiKey)
    logger.info(this.#baseUrl)
    this.#axiosInstance.get(this.#baseUrl + "/discover/movie", {
        params: {
            sort_by: "popularity.desc",
            page: 1,
        }
    })
      .then((res) => {
        logger.info(JSON.stringify(res.data)); 
      })
      .catch((error) => {
        if (error.response) {
          logger.error(
            "Obtaining access token resulted in an error: " +
              JSON.stringify(error.response.data)
          );
        }
      });
  }

  //This function will refresh the access token if needed
  async RefreshAccessToken() {}
}

module.exports = new TMDBService();
