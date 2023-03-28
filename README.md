# Rochdale Bin Collection API

## ⚡️ System Dependencies

- [deno](https://deno.land/)

## 🎲 Usage

- https://rochdale-bin-collection.deno.deploy.dev?postcode=M24+1WE


```json
[
	{
		"uprn": "23107833",
		"address": "WOOD COTTAGE ALKRINGTON WOOD, MANCHESTER, M24 1WE"
	}
]

```



- https://rochdale-bin-collection.deno.deploy.dev?uprn=23107833

```json
[
	{
		"date": "2023-03-28T00:00:00.000Z",
		"bins": [
			{
				"color": "Blue",
				"name": "Paper and cardboard",
				"icon": "https://webforms.rochdale.gov.uk/images/bin%20icons/Blue%20bin%20icon.png"
			}
		]
	},
	{
		"date": "2023-04-04T00:00:00.000Z",
		"bins": [
			{
				"color": "Dark green",
				"name": "General Waste",
				"icon": "https://webforms.rochdale.gov.uk/images/bin%20icons/Green%20bin%20icon.png"
			}
		]
	},
	{
		"date": "2023-04-11T00:00:00.000Z",
		"bins": [
			{
				"color": "Light green with blue lid",
				"name": "Mixed recycling",
				"icon": "https://webforms.rochdale.gov.uk/images/bin%20icons/Green%20blue%20bin%20icon.png"
			}
		]
	},
	{
		"date": "2023-04-18T00:00:00.000Z",
		"bins": [
			{
				"color": "Dark green",
				"name": "General Waste",
				"icon": "https://webforms.rochdale.gov.uk/images/bin%20icons/Green%20bin%20icon.png"
			}
		]
	},
	{
		"date": "2023-04-25T00:00:00.000Z",
		"bins": [
			{
				"color": "Blue",
				"name": "Paper and cardboard",
				"icon": "https://webforms.rochdale.gov.uk/images/bin%20icons/Blue%20bin%20icon.png"
			}
		]
	}
]
```

## 🎓 License

MIT: https://kylewelsby.mit-license.org
