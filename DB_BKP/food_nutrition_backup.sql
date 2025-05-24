--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: components; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.components (
    component_id integer NOT NULL,
    meal_id integer,
    component_name character varying(100) NOT NULL,
    base_quantity_g numeric(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.components OWNER TO food_nutrition_user;

--
-- Name: components_component_id_seq; Type: SEQUENCE; Schema: public; Owner: food_nutrition_user
--

CREATE SEQUENCE public.components_component_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_component_id_seq OWNER TO food_nutrition_user;

--
-- Name: components_component_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: food_nutrition_user
--

ALTER SEQUENCE public.components_component_id_seq OWNED BY public.components.component_id;


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    ingredient_name character varying(100) NOT NULL,
    default_unit character varying(20) NOT NULL,
    calories_per_100g numeric(10,2) NOT NULL,
    fat_g numeric(10,2) NOT NULL,
    protein_g numeric(10,2) NOT NULL,
    carbohydrates_g numeric(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ingredients OWNER TO food_nutrition_user;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: food_nutrition_user
--

CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_ingredient_id_seq OWNER TO food_nutrition_user;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: food_nutrition_user
--

ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;


--
-- Name: meals; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.meals (
    meal_id integer NOT NULL,
    meal_name character varying(100) NOT NULL,
    description text,
    serving_size character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.meals OWNER TO food_nutrition_user;

--
-- Name: meals_meal_id_seq; Type: SEQUENCE; Schema: public; Owner: food_nutrition_user
--

CREATE SEQUENCE public.meals_meal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meals_meal_id_seq OWNER TO food_nutrition_user;

--
-- Name: meals_meal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: food_nutrition_user
--

ALTER SEQUENCE public.meals_meal_id_seq OWNED BY public.meals.meal_id;


--
-- Name: portion_options; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.portion_options (
    portion_id integer NOT NULL,
    meal_id integer,
    size_name character varying(20) NOT NULL,
    multiplier numeric(5,2) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.portion_options OWNER TO food_nutrition_user;

--
-- Name: portion_options_portion_id_seq; Type: SEQUENCE; Schema: public; Owner: food_nutrition_user
--

CREATE SEQUENCE public.portion_options_portion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.portion_options_portion_id_seq OWNER TO food_nutrition_user;

--
-- Name: portion_options_portion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: food_nutrition_user
--

ALTER SEQUENCE public.portion_options_portion_id_seq OWNED BY public.portion_options.portion_id;


--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.recipe_ingredients (
    component_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    raw_quantity_g numeric(10,2) NOT NULL,
    cooked_quantity_g numeric(10,2),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.recipe_ingredients OWNER TO food_nutrition_user;

--
-- Name: components component_id; Type: DEFAULT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.components ALTER COLUMN component_id SET DEFAULT nextval('public.components_component_id_seq'::regclass);


--
-- Name: ingredients ingredient_id; Type: DEFAULT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);


--
-- Name: meals meal_id; Type: DEFAULT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.meals ALTER COLUMN meal_id SET DEFAULT nextval('public.meals_meal_id_seq'::regclass);


--
-- Name: portion_options portion_id; Type: DEFAULT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.portion_options ALTER COLUMN portion_id SET DEFAULT nextval('public.portion_options_portion_id_seq'::regclass);


--
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.components (component_id, meal_id, component_name, base_quantity_g, created_at, updated_at) FROM stdin;
1	1	Grilled Beef for Stroganoff	867.00	2025-05-12 04:18:06.913553+00	2025-05-12 04:18:06.913553+00
2	1	Sliced Mushroom	527.00	2025-05-12 04:18:06.913553+00	2025-05-12 04:18:06.913553+00
5	49	Mushroom Risotto Recipe - Component 1	250.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
6	49	Mushroom Risotto Recipe - Component 2	1020.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	49	Mushroom Risotto Recipe - Component 3	475.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
8	50	Beef Kafta - Make it flat round shape	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	50	Hummus	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
10	50	Tabouleh Mix	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
11	1	Stroganoff Sauce	3525.00	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
12	1	Basmati Rice with Corn	2977.00	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
13	1	Chopped Parsley(Garnish on top)	1.00	2025-05-24 10:17:05.212+00	2025-05-24 10:17:05.212+00
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.ingredients (ingredient_id, ingredient_name, default_unit, calories_per_100g, fat_g, protein_g, carbohydrates_g, created_at, updated_at) FROM stdin;
2	Olive oil	g	900.00	100.00	0.00	0.00	2025-05-12 04:18:06.860211+00	2025-05-12 04:18:06.860211+00
4	Pepper	g	0.00	0.00	0.00	0.00	2025-05-12 04:18:06.860211+00	2025-05-12 04:18:06.860211+00
5	Sliced Mushroom	g	23.00	0.30	3.10	3.30	2025-05-12 04:18:06.860211+00	2025-05-12 04:18:06.860211+00
6	Kabab = 40g after cooking (before cooking 45g)	g	0.00	0.00	0.00	0.00	2025-05-17 18:41:01.006528+00	2025-05-17 18:41:01.006532+00
7	Chicken Kabab	g	165.00	3.60	31.00	0.00	2025-05-17 18:41:59.002493+00	2025-05-17 18:41:59.002497+00
12	Water	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
15	Light Butter	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
16	Fresh Thyme	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
17	Sauteed Mushroom Sliced	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
18	Chicken Stock Water	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
19	Cooking Cream	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
20	Parmesan Cheese	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
21	Truffle Oil	g	0.00	0.00	0.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
40	Onion	g	40.00	0.00	1.00	9.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
41	Fresh Tomato	g	18.00	0.00	1.00	4.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
38	Bulgur	g	342.00	1.00	12.00	76.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
33	Ice Cubes	g	0.00	0.00	0.00	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
37	Lemon Salt	g	0.00	0.00	0.00	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
24	Beef Topside	g	130.00	5.00	22.00	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
26	Chopped Parsley	g	36.00	1.00	3.00	6.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
28	Cinnamon Powder	g	247.00	1.00	4.00	81.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
32	Chickpeas (Garbanzo Beans), Boiled	g	378.00	6.00	21.00	63.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
30	Chili Powder	g	282.00	14.00	14.00	50.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
34	Tahini	g	595.00	54.00	17.00	21.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
3	Salt	g	0.00	0.00	0.00	0.00	2025-05-12 04:18:06.860211+00	2025-05-12 04:18:06.860211+00
10	Risotto Rice	g	360.00	1.00	7.00	79.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
11	Chicken Stock Powder	g	6.00	0.00	1.00	0.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
14	Chopped Onion	g	40.00	0.00	1.00	9.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
23	White Pepper	g	296.00	2.00	10.00	69.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
31	Olive Oil	g	884.00	100.00	0.00	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
1	Beef Topside (Strips)	g	130.00	5.00	22.00	0.00	2025-05-12 04:18:06.860211+00	2025-05-12 04:18:06.860211+00
42	Shredded Onion	g	160.00	0.00	4.00	37.00	2025-05-24 09:34:13.999+00	2025-05-24 09:34:13.999+00
43	Chopped Rosemary	g	10.00	0.00	0.00	2.00	2025-05-24 09:34:14.246+00	2025-05-24 09:34:14.246+00
44	In-house Demi-Glace 	g	22.00	0.00	5.00	1.00	2025-05-24 09:34:14.263+00	2025-05-24 09:34:14.263+00
45	Cooking Cream 	g	1700.00	181.00	14.00	14.00	2025-05-24 09:34:14.282+00	2025-05-24 09:34:14.282+00
46	Basmati Rice	g	365.00	1.00	7.00	80.00	2025-05-24 09:44:29.024+00	2025-05-24 09:44:29.024+00
35	Canola Oil	g	884.00	100.00	0.00	0.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
47	Bay Leaf	g	313.00	8.00	8.00	75.00	2025-05-24 09:44:29.048+00	2025-05-24 09:44:29.048+00
48	Corn	g	86.00	1.00	3.00	19.00	2025-05-24 09:44:29.065+00	2025-05-24 09:44:29.065+00
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.meals (meal_id, meal_name, description, serving_size, created_at, updated_at) FROM stdin;
1	Beef Stroganoff	Classic beef stroganoff	1p	2025-05-12 04:18:06.8962+00	2025-05-12 04:18:06.8962+00
49	Mushroom Risotto Recipe		1P	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
50	Beef Kafta Skewers with Hummus and Tabouleh		1P	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
\.


--
-- Data for Name: portion_options; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.portion_options (portion_id, meal_id, size_name, multiplier, created_at, updated_at) FROM stdin;
1	49	1P	1.00	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
2	50	1P	1.00	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.recipe_ingredients (component_id, ingredient_id, raw_quantity_g, cooked_quantity_g, created_at, updated_at) FROM stdin;
1	1	1000.00	867.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
1	2	20.00	20.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
1	3	5.00	5.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
1	4	2.00	2.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
2	5	600.00	527.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
2	2	20.00	20.00	2025-05-12 04:18:06.952385+00	2025-05-12 04:18:06.952385+00
5	10	250.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
6	11	20.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
6	12	1.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	10	200.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	14	20.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	15	15.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	16	1.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	17	50.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	18	170.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	19	40.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	20	20.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	21	5.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	3	3.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
7	23	1.00	\N	2025-05-18 04:32:26.082531+00	2025-05-18 04:32:26.082531+00
8	24	1000.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	14	120.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	26	40.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	3	10.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	28	2.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	23	2.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	30	2.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
8	31	0.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	32	1000.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	33	400.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	34	350.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	35	100.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	3	12.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
9	37	12.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
10	38	15.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
10	26	60.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
10	40	15.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
10	41	50.00	\N	2025-05-18 04:51:52.676633+00	2025-05-18 04:51:52.676633+00
11	31	20.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	42	400.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	43	8.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	12	2500.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	44	200.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	3	15.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	23	4.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	5	500.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
11	45	500.00	\N	2025-05-24 09:34:14.334+00	2025-05-24 09:34:14.334+00
12	46	1000.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
12	35	40.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
12	47	2.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
12	3	16.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
12	12	2000.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
12	48	250.00	\N	2025-05-24 09:44:29.081+00	2025-05-24 09:44:29.081+00
13	26	1.00	\N	2025-05-24 10:17:05.212+00	2025-05-24 10:17:05.212+00
\.


--
-- Name: components_component_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.components_component_id_seq', 13, true);


--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 48, true);


--
-- Name: meals_meal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.meals_meal_id_seq', 50, true);


--
-- Name: portion_options_portion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.portion_options_portion_id_seq', 2, true);


--
-- Name: components components_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_pkey PRIMARY KEY (component_id);


--
-- Name: ingredients ingredients_ingredient_name_key; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_ingredient_name_key UNIQUE (ingredient_name);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- Name: meals meals_meal_name_key; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_meal_name_key UNIQUE (meal_name);


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (meal_id);


--
-- Name: portion_options portion_options_meal_id_size_name_key; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.portion_options
    ADD CONSTRAINT portion_options_meal_id_size_name_key UNIQUE (meal_id, size_name);


--
-- Name: portion_options portion_options_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.portion_options
    ADD CONSTRAINT portion_options_pkey PRIMARY KEY (portion_id);


--
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (component_id, ingredient_id);


--
-- Name: components components_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id) ON DELETE CASCADE;


--
-- Name: portion_options portion_options_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.portion_options
    ADD CONSTRAINT portion_options_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id) ON DELETE CASCADE;


--
-- Name: recipe_ingredients recipe_ingredients_component_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.components(component_id) ON DELETE CASCADE;


--
-- Name: recipe_ingredients recipe_ingredients_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

