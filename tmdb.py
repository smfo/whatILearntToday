import requests

# Global variabel
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjRjYWVmYmZhMDJlYTQ4ZTgyMWExYzYyZjc2Zjc3YSIsInN1YiI6IjY1YmJlY2M0ZDdjZDA2MDE3YjU0MzBlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yZ3UNW2Eh921T7IdspL6BXSf7QBNT_AnumP0dqwnSfE"
}

# Funksjon definisjon
def person_movies():
    # Be om og lagre brukerinput
    person_name = input('Person: ')
    # Gjør url kall enkelt med requests
    person_res = requests.get("https://api.themoviedb.org/3/search/person?query={0}&include_adult=false&language=en-US&page=1".format(person_name), headers=headers)
    person_id = person_res.json()['results'][0]['id']

    movies_res = requests.get("https://api.themoviedb.org/3/person/{0}/movie_credits".format(person_id), headers=headers)

    movie_titles = []

    for item in movies_res.json()['cast']:
        movie_titles.append(item['title'])

    for item in movies_res.json()['crew']:
        movie_titles.append(item['title'])
    
    return movie_titles

def get_movie_id():
    movie_name = input("Movie: ")
    release_year = input("Release year (enter is unknown): ")

    query = ""

    if len(release_year) > 0:
        query = "&year=", release_year

    # Refere til variabler i string med {n}, format(n, n+1)
    movie_search = requests.get("https://api.themoviedb.org/3/search/movie?query={0}&include_adult=false&language=en-US&page=1{1}".format(movie_name, query), headers=headers)
    
    if len(movie_search.json()['results']) == 0:
        print("Couldn't find movie")
        return False

    first_hit = movie_search.json()['results'][0]
    print(first_hit['title'], first_hit['release_date'])
    print(first_hit['overview'])
    print("\n")

    return first_hit["id"]

def shared_movies():
    first_list = person_movies()
    second_list = person_movies()

    # Intersection of two lists
    shared_list = list(set(first_list) & set(second_list))

    print(len(shared_list), " shared movies")
    print(shared_list)

def different_movies():
    print("Movies that person 1 is in without person 2")
    first_list = person_movies()
    second_list = person_movies()

    # Onesided difference of two lists
    different_list = list(set(first_list) - set(second_list))

    print(different_list)

def movie_cast():
    movie_id = get_movie_id()

    if movie_id == False:
        return False

    movie_res = requests.get("https://api.themoviedb.org/3/movie/{0}/credits".format(movie_id), headers=headers)

    person_list = []

    for item in movie_res.json()['cast']:
        # Create tuppel
        person_list.append((item['id'], item['name']))

    for item in movie_res.json()['crew']:
        person_list.append((item['id'], item['name']))

    return person_list


def movie_link():
    first_cast = movie_cast()

    if first_cast == False:
        return

    second_cast = movie_cast()

    if second_cast == False:
        return

    shared = list(set(first_cast) & set(second_cast))
    count = len(shared)

    print("Common cast and crew (", count, ")")
    print(shared)


# Kjøres på startup
if __name__ == "__main__":

    running = True

    while running == True:

        print("Shared movies: 1")
        print("Movies with one person, no the other: 2")
        print("Does the movielink exist: 3")
        print("Quit: 4")

        choice = input("Function ")

        match choice:
            case "1":
                shared_movies()
            case "2":
                different_movies()
            case "3":
                movie_link()
            case _:
                running = False

        print("\n")
        print("\n")
        print("\n")
        