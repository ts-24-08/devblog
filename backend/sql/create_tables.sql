    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    content TEXT, 
    teaser TEXT,
    date TEXT,
    author TEXT,
    imagepath TEXT,
    imagealt TEXT,
    tags TEXT);

    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
    )