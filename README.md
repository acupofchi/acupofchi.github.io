## Creating a new podcast episode

Create a new file in content/episodes for the episode. Add an mp3 file for the episode.

Follow the format, make sure there's a new GUID. You have to write the GUID by hand.

```
---
type: podcast-episode
status: published
slug: /episodes/0-introduction
source: ./Episode0.mp3
img: ../assets/placeholder.png
guid: c30fddca-79fb-48b1-8ad5-69591149df8c
title: "The Zeroth Episode"
subtitle: Introducing the Hosts
publicationDate: 2021-03-31
author: Blaine Lewis and Karthik Mahadevan
season: 1
episodeNumber: 0
episodeType: trailer
excerpt: In this episode we talk briefly about the future of the podcast, then we introduce ourselves by interviewing each other.
explicit: false
categories:

- Category 1
- Category 2
---
```
