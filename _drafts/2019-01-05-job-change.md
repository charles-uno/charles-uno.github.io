---
layout: post
title: "How I Almost Left Cray"
image: "/assets/images/javier-allegue-barros-signpost-thumb.png"
description: ""
---

In grad school, I did an internship at [Cray](http://www.cray.com) writing automated tests. It was a good fit, so I stuck with it, and joined Cray full-time as soon as I finished my PhD. The job treated me well, even as Cray hit [rough times](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/). I had a fair amount of freedom to choose what I worked on, a supportive team, and a manager[^4] who challenged me to explore and grow.

[^4]: It's only in hindsight I realize how phenomenal Gina was as a manager. I swear she had my whole career path mapped out in her head. Every time I came to her looking for more, she had something up her sleeve. Mentoring an intern. Rotation in another group. High-profile project. Engaging with a customer site.

Over time, I drifted from *writing* tests into test *infrastructure*: mainframe administration, tool development, log scraping, and miscellaneous automation. 

The push to 


The new [SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/) was determined to drag Cray's development practices into the 21st century, particularly with respect to testing. 





[Shasta](https://www.hpcwire.com/2018/10/30/cray-unveils-shasta-lands-nersc-9-contract/) (Cray's once-per-decade paradigm shift) was kicking into high gear.









---

---










My job treated me well, even as Cray hit [rough times](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/). I started out writing tests, then moved into test infrastructure. Mainframe administration, boot analysis, log scraping -- every few months, there would be a new batch of problems to tackle. 

Shit hit the fan in mid-2018. Cray's new [SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/) had promised to drag the company kicking and screaming into this century, and the test organization in particular found itself in his crosshairs. He wanted industry-standard tools, but we used a patchwork of homegrown scripts. He wanted testers embedded with development groups, but we were centralized. He wanted agile, but we used waterfall. Suddenly, we found ourselves responsible for getting an automated test pipeline up and running in an implausibly-short amount of time.

This was all overseen by Dennis, the test director's right hand man. My aim isn't to air out dirty laundry, so I'll just say: Dennis is a Staff Engineer by virtue of his technical work, hardware knowledge, business savvy, and customer relationships. He doesn't have a background in breaking down goals, setting priorities, or delegating work. It was rough.









The second shoe fell at the end of Q3. Of the thirty test engineers reporting to Linda, twenty would be reorganized into development teams in early 2019. The other ten, myself included, faced an uncertain future. Some would remain testers, focused specifically on full-system testing. There would also be an infrastructure group and an integration group, though it was still unclear which people (and which responsibilities) would land where.

I knew where I wanted to land. For the past three months, I had been writing pipeline code all day, every day. The work was interesting, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long-term plan, but the [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) group was understaffed and missing deadlines. The group had a few jobs posted, so I applied for them. Hiring decisions were on hold -- DevOps was also in the midst of a re-org -- but at least I got some face-to-face meetings to express my interest.













The company is a good fit. Cray's not evil[^3]. The commute is convenient. We get donuts on Tuesdays. And --maybe most importantly --

[^3]: Cray sells mostly to national labs and universities: weather modeling, scientific research, etc. There are some intelligence agencies and petroleum companies in the mix as well. Nobody's perfect, but on balance, I believe Cray makes the world a better place.  

> Might be good to start with: what's my background at Cray? How long have I been there, what do I do, why do I like it?

---

Not long ago, Cray hired a [new SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/), who promised to drag the company kicking and screaming into this century. He wanted to see the adoption of industry-standard tools, [agile software development practices](https://en.wikipedia.org/wiki/Agile_software_development), pipeline[^1] automation, and embedded testing. Six months later, as if to drive home the urgency of these reforms, Cray [laid off](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/) one out of every seven employees.

[^1]: "Pipeline" basically refers to using a tool like [Jenkins](https://en.wikipedia.org/wiki/Jenkins_(software)) to automatically perform a series of tasks. For example, we might use a pipeline to test our source code whenever someone makes a change. If the tests pass, the pipeline automatically installs the code so nobody keeps accidentally using the old version. If the tests fail, the pipeline reverts the change and sends an email to whoever made it. Pipelines can be tricky to set up, but once they're running they allow everyone to work much more efficiently.

Linda, the director of testing and my boss-boss, found herself in the crosshairs. Testing at Cray was a central organization, with testers rarely embedded in development teams. Runs were orchestrated by a multi-decade patchwork of home-grown scripts -- barely an industry-standard tool in sight, and certainly not something you'd want to plug into a build pipeline. And, of course, this shake-up was hitting us just as work on [Shasta](https://www.hpcwire.com/2018/10/30/cray-unveils-shasta-lands-nersc-9-contract/) (Cray's once-per-decade paradigm shift) was kicking into high gear.

From where I sat, it felt like the changes might be gradual. We tidied up our infrastructure, which seemed to go over well. Testers were half-embedded in a few projects, getting involved early in the development process while remaining organizationally distinct. Linda did her best to show the value of the test organization.

Shit hit the fan in July. Our infrastructure cleanup had been cute, but R&D was going all-in on third-party automation tools like Jenkins. Three of us (plus my intern) were dedicated to getting a test pipeline up and running as quickly as possible. Dennis, Linda's right hand man, took charge of the project.

The next few months were rough. My aim isn't to air out dirty laundry, so I'll just say: Dennis is a Staff Engineer by virtue of his technical work, hardware knowledge, business savvy, and customer relationships. But his skill set does not cover breaking down a goal, setting priorities, or delegating work.

The second shoe fell at the end of Q3. Of the thirty test engineers reporting to Linda, twenty would be reorganized into development teams in early 2019. The other ten, myself included, faced an uncertain future. Some would remain testers, focused specifically on full-system testing. There would also be an infrastructure group and an integration group, though it was still unclear which people (and which responsibilities) would land where.

I knew where I wanted to land. For the past three months, I had been writing pipeline code all day, every day. The work was interesting, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long-term plan, but the [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) group was understaffed and missing deadlines. The group had a few jobs posted, so I applied for them. Hiring decisions were on hold -- DevOps was also in the midst of a re-org -- but at least I got some face-to-face meetings to express my interest.

Around this time, I also checked that box on LinkedIn that lets recruiters contact you -- and contact me they did. I chatted with at least twenty recruiters on the phone, and met with a handful in person. There were a lot of dead ends, opportunity-wise, but talking through job after job helped me nail down


get Gina in here. she is aware, giving advice, but sidelined. working on some other thing.

Storage -- semi-independent product line






---

---


In the meantime, we continued to work under Dennis' direction. It wasn't clear where people (or responsibilities) were going to land, so he did his best to align the team to the Q4 objectives laid out by upper management. The team consolidated documentation, created testing resources, and put on tech forums. We checked a lot of boxes, but it was often unclear if we were creating anything of real value -- a concern I raised more than once.

I had just spent three months writing pipeline code all day, every day. I enjoyed the work, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long term plan, but [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) was short-staffed and missing deadlines. Getting pulled off the pipeline to write up a blog post comparing and contrasting [avocado](https://avocado-framework.github.io/), [pytest](https://docs.pytest.org/en/latest/), and [unittest](https://docs.python.org/3/library/unittest.html)[^2] was like a slap in the face.

[^2]: Of the unit testing options for Python, pytest is the nicest to work with. But honestly they're all fine.





Gina was well aware of all this.





So I set a few things in motion:

-









I raised my objections politely, firmly, forcefully, and maybe even mutinously.






I made a lot of noise about pipeline work. seemed to me that it was pretty important, aligned with a big-picture vision. but we were pushed to instead take on low-risk tasks. assembling documentation. guidance on unit testing. investigating third-party tools. maybe trying to avoid stepping on toes, give the SVP exactly what he asked for, but in practice it's not clear who (if anyone) we were creating value for.


also networked with Gina, Dan, David to try to get us moved over.
In practice, I had been doing infrastructure work for a while. applied for a few DevOps positions within Cray. Had worked closely with the DevOps team while getting our pipeline set up.



also checked the box on LinkedIn that tells recruiters it's OK to contact you. started taking calls. Met a handful of them in person.




everything came together in mid-december, right before Cray's week-long holiday shutdown.

org chart showing they want to move me over to DevOps

Town hall with Jose

Gina took a different position within Cray

Jose is Linda's boss -- and also Tara's boss. Tara is new. DevOps position is under a new director, and there is no manager.


On my plate all at once: Wells Fargo offer, DevOps, Storage






Gina. Existing manager. Is *great*.

I'm driven to climb, but don't have a long-term plan. Every time I was looking for more, Gina had something in her pocket. Would I like to mentor an intern? How about interface with a customer site? Jump onto a team of junior engineers and offer guidance? Direct the team from the Governance Board?

options: architect? management?

Offer from Storage. Would be very visible to the VP, Charlie.



Checked that box on LinkedIn that tells recruiters to contact me, and did they ever.

Spoke to probably a dozen different recruiters on the phone, and met with a handful in person. Got the most traction with a recruiter representing Wells Fargo.
