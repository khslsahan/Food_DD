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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: food_nutrition_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO food_nutrition_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: food_nutrition_user
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO food_nutrition_user;

--
-- Name: component_portions; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.component_portions (
    portion_id integer NOT NULL,
    component_id integer NOT NULL,
    label character varying(20) NOT NULL,
    total_weight_g numeric(10,2) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.component_portions OWNER TO food_nutrition_user;

--
-- Name: component_portions_portion_id_seq; Type: SEQUENCE; Schema: public; Owner: food_nutrition_user
--

CREATE SEQUENCE public.component_portions_portion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.component_portions_portion_id_seq OWNER TO food_nutrition_user;

--
-- Name: component_portions_portion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: food_nutrition_user
--

ALTER SEQUENCE public.component_portions_portion_id_seq OWNED BY public.component_portions.portion_id;


--
-- Name: components; Type: TABLE; Schema: public; Owner: food_nutrition_user
--

CREATE TABLE public.components (
    component_id integer NOT NULL,
    meal_id integer,
    component_name character varying(100) NOT NULL,
    before_cook_weight_g numeric(10,2),
    after_cook_weight_g numeric(10,2),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
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
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
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
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
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
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
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
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.recipe_ingredients OWNER TO food_nutrition_user;

--
-- Name: component_portions portion_id; Type: DEFAULT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.component_portions ALTER COLUMN portion_id SET DEFAULT nextval('public.component_portions_portion_id_seq'::regclass);


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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
66e77a08-bd9a-4608-b51f-c33b67aef9ab	bca560a543cdb109eec8f2030243731af78e67210a8d5e55c9a0b0bb529a564f	2025-05-24 13:17:22.055349+00	20250524131719_add_before_after_cook_weight	\N	\N	2025-05-24 13:17:21.106842+00	1
\.


--
-- Data for Name: component_portions; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.component_portions (portion_id, component_id, label, total_weight_g, created_at, updated_at) FROM stdin;
11	5	2P	260.00	2025-05-25 05:36:15.931+00	2025-05-25 05:36:15.931+00
12	5	1P	180.00	2025-05-25 05:36:15.931+00	2025-05-25 05:36:15.931+00
15	4	2P	100.00	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
19	1	2P	120.00	2025-05-25 05:57:32.578+00	2025-05-25 05:57:32.578+00
31	6	2P	20.00	2025-05-25 06:38:25.1+00	2025-05-25 06:38:25.1+00
32	7	2P	110.00	2025-05-26 15:44:15.694+00	2025-05-26 15:44:15.694+00
33	2	2P	0.00	2025-05-26 17:31:28.747+00	2025-05-26 17:31:28.747+00
34	3	2P	120.00	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
35	8	2P	100.00	2025-05-28 15:04:46.645+00	2025-05-28 15:04:46.645+00
36	9	2P	60.00	2025-05-28 15:06:02.066+00	2025-05-28 15:06:02.066+00
37	10	2P	60.00	2025-05-28 15:06:48.127+00	2025-05-28 15:06:48.127+00
38	11	2P	40.00	2025-05-28 15:09:10.713+00	2025-05-28 15:09:10.713+00
39	12	2P	80.00	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
40	13	2P	200.00	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
41	14	2P	90.00	2025-05-28 15:32:53.705+00	2025-05-28 15:32:53.705+00
42	15	2P	150.00	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
43	16	2P	90.00	2025-05-28 15:53:58.473+00	2025-05-28 15:53:58.473+00
44	17	2P	5.00	2025-05-28 15:54:31.194+00	2025-05-28 15:54:31.194+00
45	18	2P	1.00	2025-05-28 15:55:10.361+00	2025-05-28 15:55:10.361+00
46	19	2P	5.00	2025-05-28 15:55:48.202+00	2025-05-28 15:55:48.202+00
\.


--
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.components (component_id, meal_id, component_name, before_cook_weight_g, after_cook_weight_g, created_at, updated_at) FROM stdin;
5	2	Risotto Rice	250.00	640.00	2025-05-25 04:34:11.572+00	2025-05-25 04:34:11.572+00
4	1	Basmati Rice with Corn	3308.00	2977.00	2025-05-25 03:46:11.598+00	2025-05-25 03:46:11.598+00
1	1	Grilled Beef	1020.00	867.00	2025-05-25 03:08:26.951+00	2025-05-25 03:08:26.951+00
6	2	Chicken Stock Water	1020.00	1020.00	2025-05-25 06:38:25.1+00	2025-05-25 06:38:25.1+00
7	3	Salmon Fillet	110.00	110.00	2025-05-26 15:44:15.694+00	2025-05-26 15:44:15.694+00
2	1	Sliced Mushroom	620.00	527.00	2025-05-25 03:24:20.533+00	2025-05-25 03:24:20.533+00
3	1	Stroganoff Sauce	4147.00	3525.00	2025-05-25 03:32:10.286+00	2025-05-25 03:32:10.286+00
8	3	Beetroot Mashed Potato	100.00	100.00	2025-05-28 15:04:46.645+00	2025-05-28 15:04:46.645+00
9	3	Boiled Carrot	60.00	60.00	2025-05-28 15:06:02.066+00	2025-05-28 15:06:02.066+00
10	3	Boiled Zucchini	60.00	60.00	2025-05-28 15:06:48.127+00	2025-05-28 15:06:48.127+00
11	3	Honey Mustard Sauce	40.00	40.00	2025-05-28 15:09:10.713+00	2025-05-28 15:09:10.713+00
12	4	SAUCE	1663.00	1164.00	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
13	4	Noodles	428.00	428.00	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
14	4	Shrimp Marination	207.00	207.00	2025-05-28 15:32:53.705+00	2025-05-28 15:32:53.705+00
15	5	Rice Mix	4731.00	3312.00	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
16	5	Shrimps  	90.00	90.00	2025-05-28 15:53:58.473+00	2025-05-28 15:53:58.473+00
17	5	Raisins 	5.00	5.00	2025-05-28 15:54:31.194+00	2025-05-28 15:54:31.194+00
18	5	Coriander 	1.00	1.00	2025-05-28 15:55:10.361+00	2025-05-28 15:55:10.361+00
19	5	Cashews 	5.00	5.00	2025-05-28 15:55:48.202+00	2025-05-28 15:55:48.202+00
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.ingredients (ingredient_id, ingredient_name, default_unit, calories_per_100g, fat_g, protein_g, carbohydrates_g, created_at, updated_at) FROM stdin;
3	Salt	g	0.00	0.00	0.00	0.00	2025-05-25 03:08:26.917+00	2025-05-25 03:08:26.917+00
4	Pepper	g	251.00	3.00	10.00	64.00	2025-05-25 03:08:26.933+00	2025-05-25 03:08:26.933+00
5	Sliced Mushroom	g	22.00	0.33	3.17	3.33	2025-05-25 03:24:20.51+00	2025-05-25 03:24:20.51+00
2	Olive oil 	g	884.00	100.00	0.00	0.00	2025-05-25 03:08:26.883+00	2025-05-25 03:08:26.883+00
6	Olive Oil	g	885.00	100.00	0.00	0.00	2025-05-25 03:32:10.169+00	2025-05-25 03:32:10.169+00
7	Shredded Onion (Wings)	g	40.00	0.00	1.00	9.25	2025-05-25 03:32:10.184+00	2025-05-25 03:32:10.184+00
8	Chopped Rosemary	g	125.00	0.00	0.00	25.00	2025-05-25 03:32:10.201+00	2025-05-25 03:32:10.201+00
9	Water	g	0.00	0.00	0.00	0.00	2025-05-25 03:32:10.218+00	2025-05-25 03:32:10.218+00
10	In-house Demi-Glace 	g	11.00	0.00	2.50	0.50	2025-05-25 03:32:10.235+00	2025-05-25 03:32:10.235+00
11	White Pepper	g	300.00	0.00	0.00	75.00	2025-05-25 03:32:10.253+00	2025-05-25 03:32:10.253+00
12	Cooking Cream	g	340.00	36.20	2.80	2.80	2025-05-25 03:32:10.27+00	2025-05-25 03:32:10.27+00
13	Basmati Rice	g	365.00	0.70	7.10	80.00	2025-05-25 03:46:11.502+00	2025-05-25 03:46:11.502+00
14	Canola Oil	g	885.00	100.00	0.00	0.00	2025-05-25 03:46:11.53+00	2025-05-25 03:46:11.53+00
15	Bay Leaf	g	300.00	0.00	0.00	100.00	2025-05-25 03:46:11.547+00	2025-05-25 03:46:11.547+00
16	Water 	g	0.00	0.00	0.00	0.00	2025-05-25 03:46:11.565+00	2025-05-25 03:46:11.565+00
17	Corn	g	86.00	1.20	3.20	18.80	2025-05-25 03:46:11.581+00	2025-05-25 03:46:11.581+00
18	Risotto Rice	g	360.00	0.40	6.80	79.20	2025-05-25 04:34:11.535+00	2025-05-25 04:34:11.535+00
19	Chicken Stock Powder	g	5.00	0.00	0.00	0.00	2025-05-25 06:38:25.079+00	2025-05-25 06:38:25.079+00
20	Salmon Fillet	g	208.18	13.64	20.00	0.00	2025-05-26 15:44:15.666+00	2025-05-26 15:44:15.666+00
1	Beef Topside	g	130.00	5.00	22.00	0.00	2025-05-25 03:08:26.839+00	2025-05-25 03:08:26.839+00
21	Beetroot Mashed Potato cooked	g	89.00	3.00	2.00	15.00	2025-05-28 15:04:46.561+00	2025-05-28 15:04:46.561+00
22	Boiled Carrot	g	41.67	0.00	1.67	10.00	2025-05-28 15:06:02.037+00	2025-05-28 15:06:02.037+00
23	Boiled Zucchini	g	16.67	0.00	1.67	3.33	2025-05-28 15:06:48.105+00	2025-05-28 15:06:48.105+00
24	Honey Mustard Sauce	g	270.00	2.50	2.50	5.00	2025-05-28 15:09:10.695+00	2025-05-28 15:09:10.695+00
25	Light Butter	g	500.00	55.00	5.00	0.00	2025-05-28 15:20:21.244+00	2025-05-28 15:20:21.244+00
26	Chopped Garlic	g	150.00	0.00	0.00	33.33	2025-05-28 15:20:21.268+00	2025-05-28 15:20:21.268+00
27	Chopped Ginger	g	80.00	0.00	0.00	20.00	2025-05-28 15:20:21.285+00	2025-05-28 15:20:21.285+00
28	Oyster Sauce	g	51.00	0.33	1.33	11.00	2025-05-28 15:20:21.303+00	2025-05-28 15:20:21.303+00
29	Soy Sauce	g	54.00	0.00	8.00	4.00	2025-05-28 15:20:21.319+00	2025-05-28 15:20:21.319+00
30	Sugar Cane	g	387.50	0.00	0.00	100.00	2025-05-28 15:20:21.336+00	2025-05-28 15:20:21.336+00
31	Sesame Oil	g	880.00	100.00	0.00	0.00	2025-05-28 15:20:21.354+00	2025-05-28 15:20:21.354+00
32	Bay Leave	g	300.00	0.00	0.00	100.00	2025-05-28 15:20:21.37+00	2025-05-28 15:20:21.37+00
33	Chili Powder	g	300.00	0.00	0.00	0.00	2025-05-28 15:20:21.387+00	2025-05-28 15:20:21.387+00
34	Corn Flour	g	360.00	6.67	6.67	73.33	2025-05-28 15:20:21.404+00	2025-05-28 15:20:21.404+00
35	Shredded Carrot	g	42.00	0.00	0.00	10.00	2025-05-28 15:31:22.229+00	2025-05-28 15:31:22.229+00
36	Steamed Broccoli	g	34.00	0.00	3.00	7.00	2025-05-28 15:31:22.251+00	2025-05-28 15:31:22.251+00
37	Shredded Onion	g	40.00	0.00	2.00	10.00	2025-05-28 15:31:22.269+00	2025-05-28 15:31:22.269+00
38	Spring Onion	g	40.00	0.00	0.00	0.00	2025-05-28 15:31:22.285+00	2025-05-28 15:31:22.285+00
39	Soya Sauce	g	53.33	0.00	6.67	6.67	2025-05-28 15:31:22.303+00	2025-05-28 15:31:22.303+00
40	Cooked Noodles	g	384.00	4.67	14.00	71.33	2025-05-28 15:31:22.321+00	2025-05-28 15:31:22.321+00
41	Grilled Shrimps	g	71.00	1.00	13.50	1.00	2025-05-28 15:32:53.655+00	2025-05-28 15:32:53.655+00
42	Black Pepper	g	250.00	0.00	0.00	50.00	2025-05-28 15:32:53.689+00	2025-05-28 15:32:53.689+00
43	Bay Leaves	g	300.00	0.00	0.00	100.00	2025-05-28 15:53:18.644+00	2025-05-28 15:53:18.644+00
44	Dry Cardamom	g	300.00	0.00	0.00	50.00	2025-05-28 15:53:18.669+00	2025-05-28 15:53:18.669+00
45	Cinnamon Stick	g	250.00	0.00	0.00	83.33	2025-05-28 15:53:18.703+00	2025-05-28 15:53:18.703+00
46	Turmeric	g	310.00	5.00	10.00	65.00	2025-05-28 15:53:18.721+00	2025-05-28 15:53:18.721+00
47	Kabse Spices	g	300.00	0.00	0.00	0.00	2025-05-28 15:53:18.738+00	2025-05-28 15:53:18.738+00
48	Raisins	g	299.00	0.00	3.00	79.00	2025-05-28 15:53:18.756+00	2025-05-28 15:53:18.756+00
49	Gala Masala	g	266.67	8.33	8.33	75.00	2025-05-28 15:53:18.772+00	2025-05-28 15:53:18.772+00
50	Carrot Cubes	g	41.00	0.00	1.00	9.50	2025-05-28 15:53:18.789+00	2025-05-28 15:53:18.789+00
51	Chopped Onion	g	40.00	0.00	1.00	9.50	2025-05-28 15:53:18.805+00	2025-05-28 15:53:18.805+00
52	Chicken Stock	g	35.00	0.00	2.50	2.50	2025-05-28 15:53:18.827+00	2025-05-28 15:53:18.827+00
53	Shrimps  	g	85.56	0.00	20.00	0.00	2025-05-28 15:53:58.443+00	2025-05-28 15:53:58.443+00
54	Raisins 	g	300.00	0.00	0.00	80.00	2025-05-28 15:54:31.176+00	2025-05-28 15:54:31.176+00
55	Coriander 	g	300.00	0.00	0.00	100.00	2025-05-28 15:55:10.339+00	2025-05-28 15:55:10.339+00
56	Cashews 	g	560.00	40.00	20.00	40.00	2025-05-28 15:55:48.183+00	2025-05-28 15:55:48.183+00
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.meals (meal_id, meal_name, description, created_at, updated_at) FROM stdin;
1	Beef Stroganoff	Beef Stroganoff	2025-05-24 13:45:26.639+00	2025-05-24 13:45:26.639+00
2	Mushroom Risotto	Mushroom Risotto	2025-05-25 04:26:59.926+00	2025-05-25 04:26:59.926+00
3	Salmon with Honey Mustard Sauce & Beetroot Potato Mash	Salmon with Honey Mustard Sauce & Beetroot Potato Mash	2025-05-26 15:40:24.712+00	2025-05-26 15:40:24.712+00
4	Shrimp Noodles	Shrimp Noodles	2025-05-28 15:16:02.221+00	2025-05-28 15:16:02.221+00
5	Shrimp kabse	Shrimp kabse	2025-05-28 15:39:42.432+00	2025-05-28 15:39:42.432+00
6	test	test	2025-06-07 06:10:54.775+00	2025-06-07 06:10:54.775+00
\.


--
-- Data for Name: portion_options; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.portion_options (portion_id, meal_id, size_name, multiplier, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: food_nutrition_user
--

COPY public.recipe_ingredients (component_id, ingredient_id, raw_quantity_g, cooked_quantity_g, created_at, updated_at) FROM stdin;
6	19	20.00	\N	2025-05-25 06:38:25.1+00	2025-05-25 06:38:25.1+00
6	16	1000.00	\N	2025-05-25 06:38:25.1+00	2025-05-25 06:38:25.1+00
7	20	110.00	\N	2025-05-26 15:44:15.694+00	2025-05-26 15:44:15.694+00
2	5	600.00	\N	2025-05-26 17:31:28.747+00	2025-05-26 17:31:28.747+00
2	2	20.00	\N	2025-05-26 17:31:28.747+00	2025-05-26 17:31:28.747+00
3	6	20.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	7	400.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	8	8.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	9	1000.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	10	200.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	3	15.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	11	4.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	5	500.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
3	12	500.00	\N	2025-05-26 17:32:38.839+00	2025-05-26 17:32:38.839+00
8	21	100.00	\N	2025-05-28 15:04:46.645+00	2025-05-28 15:04:46.645+00
9	22	60.00	\N	2025-05-28 15:06:02.066+00	2025-05-28 15:06:02.066+00
5	18	250.00	\N	2025-05-25 05:36:15.931+00	2025-05-25 05:36:15.931+00
10	23	60.00	\N	2025-05-28 15:06:48.127+00	2025-05-28 15:06:48.127+00
11	24	40.00	\N	2025-05-28 15:09:10.713+00	2025-05-28 15:09:10.713+00
12	25	20.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	26	6.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	27	20.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	9	1200.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	28	300.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	29	50.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	30	40.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	31	10.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	32	1.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	33	1.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
12	34	15.00	\N	2025-05-28 15:20:21.421+00	2025-05-28 15:20:21.421+00
13	6	20.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	27	10.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	26	5.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
4	13	1000.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
4	14	40.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
4	15	2.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
4	3	16.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
4	16	2000.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
4	17	250.00	\N	2025-05-25 05:51:47.305+00	2025-05-25 05:51:47.305+00
13	35	50.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	36	100.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	37	50.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	38	5.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	39	15.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	28	20.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	31	3.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
13	40	150.00	\N	2025-05-28 15:31:22.336+00	2025-05-28 15:31:22.336+00
14	41	200.00	\N	2025-05-28 15:32:53.705+00	2025-05-28 15:32:53.705+00
14	3	5.00	\N	2025-05-28 15:32:53.705+00	2025-05-28 15:32:53.705+00
14	42	2.00	\N	2025-05-28 15:32:53.705+00	2025-05-28 15:32:53.705+00
15	43	1.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	44	2.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
1	1	1000.00	\N	2025-05-25 05:57:32.578+00	2025-05-25 05:57:32.578+00
1	2	20.00	\N	2025-05-25 05:57:32.578+00	2025-05-25 05:57:32.578+00
1	3	10.00	\N	2025-05-25 05:57:32.578+00	2025-05-25 05:57:32.578+00
1	4	10.00	\N	2025-05-25 05:57:32.578+00	2025-05-25 05:57:32.578+00
15	45	6.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	46	20.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	47	12.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	13	1000.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	48	100.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	49	12.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	50	200.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	51	200.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	26	40.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	6	30.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	3	13.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	27	30.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	52	40.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
15	9	2250.00	\N	2025-05-28 15:53:18.84+00	2025-05-28 15:53:18.84+00
16	53	90.00	\N	2025-05-28 15:53:58.473+00	2025-05-28 15:53:58.473+00
17	54	5.00	\N	2025-05-28 15:54:31.194+00	2025-05-28 15:54:31.194+00
18	55	1.00	\N	2025-05-28 15:55:10.361+00	2025-05-28 15:55:10.361+00
19	56	5.00	\N	2025-05-28 15:55:48.202+00	2025-05-28 15:55:48.202+00
\.


--
-- Name: component_portions_portion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.component_portions_portion_id_seq', 46, true);


--
-- Name: components_component_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.components_component_id_seq', 19, true);


--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 56, true);


--
-- Name: meals_meal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.meals_meal_id_seq', 6, true);


--
-- Name: portion_options_portion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: food_nutrition_user
--

SELECT pg_catalog.setval('public.portion_options_portion_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: component_portions component_portions_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.component_portions
    ADD CONSTRAINT component_portions_pkey PRIMARY KEY (portion_id);


--
-- Name: components components_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_pkey PRIMARY KEY (component_id);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (meal_id);


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
-- Name: component_portions_component_id_label_key; Type: INDEX; Schema: public; Owner: food_nutrition_user
--

CREATE UNIQUE INDEX component_portions_component_id_label_key ON public.component_portions USING btree (component_id, label);


--
-- Name: ingredients_ingredient_name_key; Type: INDEX; Schema: public; Owner: food_nutrition_user
--

CREATE UNIQUE INDEX ingredients_ingredient_name_key ON public.ingredients USING btree (ingredient_name);


--
-- Name: meals_meal_name_key; Type: INDEX; Schema: public; Owner: food_nutrition_user
--

CREATE UNIQUE INDEX meals_meal_name_key ON public.meals USING btree (meal_name);


--
-- Name: portion_options_meal_id_size_name_key; Type: INDEX; Schema: public; Owner: food_nutrition_user
--

CREATE UNIQUE INDEX portion_options_meal_id_size_name_key ON public.portion_options USING btree (meal_id, size_name);


--
-- Name: component_portions component_portions_component_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: food_nutrition_user
--

ALTER TABLE ONLY public.component_portions
    ADD CONSTRAINT component_portions_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.components(component_id) ON DELETE CASCADE;


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: food_nutrition_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

