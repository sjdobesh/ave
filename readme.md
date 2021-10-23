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

Install flask and Flask-Reuploaded with pip (or conda) in a virtual environment.
Note that for Conda, you will have to install pip to the Conda environment, and then call pip from the environments bin folder. The path to the folder `anaconda` may be different on your system, but it installs to your home directory by default.
#### Linux

##### Pip
```
python3 -m venv env
source env/bin/activate
pip install flask Flask-Reuploaded
```

##### Conda
```
conda create --name env
conda activate env
conda install pip
~/anaconda/envs/env/bin/pip install flask Flask-Reuploaded
```

#### Windows PowerShell
```
py -3 -m venv venv
venv\Scripts\activate
pip install flask Flask-Reuploaded
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
