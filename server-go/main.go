package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
)

// Same favorites file as the Express API
const file = "server/favorites.json"

func readFavorites() []int {
	var favorites []int
	data, _ := os.ReadFile(file)
	json.Unmarshal(data, &favorites)
	return favorites
}

func writeFavorites(favorites []int) {
	data, _ := json.Marshal(favorites)
	os.WriteFile(file, data, 0644)
}

func writeJSON(w http.ResponseWriter, v any) {
	json.NewEncoder(w).Encode(v)
	w.Header().Set("Content-Type", "application/json")
}

func getFavorites(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, readFavorites())
}

func addFavorite(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.PathValue("id"))
	favorites := readFavorites()
	favorites = append(favorites, id)
	writeFavorites(favorites)
	writeJSON(w, favorites)
}

func removeFavorite(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.PathValue("id"))
	favorites := readFavorites()
	index := -1
	for i, f := range favorites {
		if f == id {
			index = i
			break
		}
	}
	if index == -1 {
		writeJSON(w, map[string]string{"error": "not found"})
		return
	}
	favorites = append(favorites[:index], favorites[index+1:]...)
	writeFavorites(favorites)
	writeJSON(w, favorites)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/favorites", getFavorites)
	mux.HandleFunc("POST /api/favorites/{id}", addFavorite)
	mux.HandleFunc("DELETE /api/favorites/{id}", removeFavorite)

	log.Println("API listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
