
# What is related data
Related data is data in one table that is also contained in a table. In the example PlayedGame is related
data to User, because a user can contain one or more games.

```C#
public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PlayedGame> PlayedGames { get; set; }
    }

public class PlayedGame : GameTable
    {
        public int Id { get; set; }
        public int UserId { get; set; }     //User FK
        public int GameId { get; set; }
        public Game Game { get; set; }
        public User User { get; set; }
        public string Review { get; set; }
        public int Score { get; set; }
    }
```