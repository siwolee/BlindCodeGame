NAME	= blind-coiding-test

COMPOSEFILE = ./docker-compose.yml

FILE = $(COMPOSEFILE)

FRONT_BUILDFILE = ./next/.next
# ./backend/back \

BUILDFILE = $(FRONT_BUILDFILE) $(BACK_BUILDFILE)

all		: $(BUILD) $(NAME)

server : FILE = ./docker-compose.server-only.yml
server : $(NAME)


cleanbuild:
	rm -rf $(BUILDFILE)

frontbuild : 
	if ! test -f $(FRONT_BUILDFILE); then \
	cd next && \
	npm install && \
	npm run build; \
	fi


$(NAME) : $(BUILDFILE)
	docker-compose -f $(FILE) up --build #--detach 

clean : 
	docker-compose -f $(FILE)  down --rmi all --remove-orphans -v

ps		: 
	docker-compose -f $(FILE) ps -a

fclean : clean cleanbuild
	docker system prune --volumes --all --force

re : fclean all




.PHONY	:	all ps dev clean fclean re
