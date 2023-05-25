
<h1 style="text-align: center;">The University of Sydney 
</h1>
<h2 style="text-align: center;"> ELEC4713: Thesis B Final
</h2>

* Students Name: **Hoang Phi Bui** 
* Students SID: **490439829** 
* Students Unikey: **hbui6373**

<h2 style="text-align: center;">AntiqueIoTChain Project</h2>

This project is a Final Thesis B ELECL4713 Submission for Blockchain Project namely AntiqueIoTChain Project. AntiqueIoTChain project aims to provide a web platform application combine with the use of blockchain technology to create a highly secure transparent web application for securely verifying and validating antique objects.

## Clone the project
Run the `clone` command on your cmd or powersheel

```sh
# clone the AntiqueIoTChain project
$ git clone https://github.com/Nathanbui2000/Thesis-B.git
```

## Installation

This project compose of 3 parts: 

- **Truffle Project** 
- **Java Project**
- **React Project**

Therefore, to run this application, we will to install all the required libraries for the above projects



### A. Truffle Project

Truffle Projects is associated with the blockchain application for this project. Its requires set up installation for the following

**1. Ganache Application**

- Step 1: install [*Ganache App For Window*](https://trufflesuite.com/ganache/ "Ganache's Homepage")
- Step 2: [Set Up Ganache As follow](https://www.youtube.com/watch?v=Y27KChVi620&ab_channel=NathanBui "Setting Up Ganache")

**2. IPFS Desktop**

- Step 1: install [*IPFS Desktop*](https://docs.ipfs.tech/install/ipfs-desktop/)

**3. Remix IDE**

- Step 1: Install [*Remix IDE*](https://sourceforge.net/projects/remix-ide.mirror/)
- Step 2: Open **Truffle** Project and [Deploy Smart Contract](https://www.youtube.com/watch?v=kgi8DhFKb4g&ab_channel=NathanBui)

## B. Java Project

Java project is related to the backend database servers and store information such as user management and appointment management. The Projects consists of the use of Docker Container. 

**1. Docker Cotainer**

- Step 1: Install [Docker.](https://docs.docker.com/desktop/install/windows-install/ "Download Docker for Windows")

- Step 2: Start **Docker** app. 

**2. Intellij IDE**

- Step 1: [Download Intellij IDE](https://www.jetbrains.com/idea/promo/?source=google&medium=cpc&campaign=9736964866&term=intellij%20idea&content=602143185778&gad=1&gclid=Cj0KCQjwyLGjBhDKARIsAFRNgW-cX7HyOkfVkKW_TC8SE5L7m_0ovSwpTuW7WmGQR1E6_UrQo8t66A8aApRGEALw_wcB)

- Step 2: [Install Java 17](https://docs.oracle.com/en/java/javase/17/install/installation-jdk-microsoft-windows-platforms.html "Install Java Environment")

- Step 3: Open **Java** project in *Intellij IDE*

- Step 4: Create A Docker Image



Run the `docker` command on **Intellij** terminal

```sh
# Go To "app" Directory if not already in 
$ cd app

# Create a Docker Image
$ docker-compose up
```
 - Step 5: Set Up  [Java Project App](https://www.youtube.com/watch?v=Z8A6QzOI1PQ&ab_channel=NathanBui "Set Up Java Backend")

 
 **3. SendGrid Email Services**

 - Step 1: Create a SendGrid Account
 - Step 2: [Set Up SendGrid Account API](https://youtu.be/ILNuC7oD1Dw) 
 


### C. React Project

The React Project is a Front End UI for this AntiqueIoTChain Project.
## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!
