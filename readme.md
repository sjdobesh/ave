# Accessible Video Editor
## Jump to
* [Project Info](#project-info "Goto project-info")
* [Installation Info](#installation-info "Goto installation-info")

## Project Info
### Course and Team
#### Course
CSCI 497T with Professor Elglaly
#### Team Members
- Robin Balatbat
- Ian Cullum
- Sam Dobesh
- Nick Harang
- Kale Kurtzhall


## Installation Info
### Dependencies
Requires Python 3 and Flask.

Install flask with pip (or conda) in a virtual environment.

#### Linux

##### Pip
```
python3 -m venv env
source env/bin/activate
pip install flask
```

##### Conda
```
conda create --name env
conda activate env
conda install flask
```

#### Windows PowerShell
```
py -3 -m venv venv
venv\Scripts\activate
pip install Flask
```

### Quick Start

#### Bash Script
```
./run.sh
```

#### CMD Script
```
./run.cmd
```

#### PowerShell Script
```
./run.ps1
```

#### Manually
Run each code line from the script associated with your terminal.
If your terminal scripting language is not supported you can do the following.
Create two environment variables, `FLASK_ENV` and `FLASK_APP`.
Set `FLASK_ENV` to `development` and `FLASK_APP` to `main`. 
Then start the website locally with `flask run`.
