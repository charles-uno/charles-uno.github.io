
IMAGE := jekyll-image
MOUNT := /workspace

.PHONY: all serve drafts container refresh debug

all: serve

serve:
	docker run --rm -p 4000:4000 --mount type=bind,source=$(PWD),target=$(MOUNT) -w $(MOUNT) $(IMAGE) bundle exec jekyll serve

drafts:
	docker run --rm -p 4000:4000 --mount type=bind,source=$(PWD),target=$(MOUNT) -w $(MOUNT) $(IMAGE) bundle exec jekyll serve --drafts

container: Dockerfile Gemfile
	docker build . -f Dockerfile -t $(IMAGE)

refresh: Dockerfile Gemfile
	docker build . -f Dockerfile -t $(IMAGE) --no-cache

debug:
	docker run -it --rm -p 4000:4000 --mount type=bind,source=$(PWD),target=$(MOUNT) -w $(MOUNT) $(IMAGE)
