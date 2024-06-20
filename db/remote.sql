--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: healths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.healths (
    id integer NOT NULL,
    "patientID" character varying(255) NOT NULL,
    device_type character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    doctor integer,
    remark character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.healths OWNER TO postgres;

--
-- Name: healths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.healths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.healths_id_seq OWNER TO postgres;

--
-- Name: healths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.healths_id_seq OWNED BY public.healths.id;


--
-- Name: healths id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.healths ALTER COLUMN id SET DEFAULT nextval('public.healths_id_seq'::regclass);


--
-- Data for Name: healths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.healths (id, "patientID", device_type, value, doctor, remark, "createdAt", "updatedAt") FROM stdin;
1	1	Test	Test	\N	\N	2024-05-29 22:15:20.544+01	2024-05-29 22:15:20.544+01
2	1	Test	Test	\N	\N	2024-05-29 22:16:38.968+01	2024-05-29 22:16:38.968+01
3	1	Test	Test	\N	\N	2024-05-29 22:47:35.719+01	2024-05-29 22:47:35.719+01
4	1	glucose_meter	Test	180	Patient diabétique de type 2. Valeur élevée de la glycémie	2024-05-30 00:01:19.375+01	2024-05-30 00:01:19.375+01
5	1	glucose_meter	Test	180	Patient diabétique de type 2. Valeur élevée de la glycémie	2024-05-30 00:02:17.417+01	2024-05-30 00:02:17.417+01
6	1	glucose_meter	Test	180	Patient diabétique de type 2. Valeur élevée de la glycémie	2024-05-30 00:02:20.501+01	2024-05-30 00:02:20.501+01
7	1	glucose_meter	Test	180	Patient diabétique de type 2. Valeur élevée de la glycémie	2024-05-30 00:03:19.982+01	2024-05-30 00:03:19.982+01
8	1	glucose_meter	Test	180	Patient diabétique de type 2. Valeur élevée de la glycémie	2024-05-30 00:03:27.588+01	2024-05-30 00:03:27.588+01
9	1	glucose_meter	Test	\N	\N	2024-05-30 00:04:04.544+01	2024-05-30 00:04:04.544+01
10	1	glucose_meter	Test	\N	\N	2024-05-30 00:04:04.598+01	2024-05-30 00:04:04.598+01
11	1	glucose_meter	Test	\N	\N	2024-05-30 00:05:48.572+01	2024-05-30 00:05:48.572+01
12	1	glucose_meter	Test	\N	\N	2024-05-30 00:09:47.903+01	2024-05-30 00:09:47.903+01
13	1	glucose_meter	Test	\N	\N	2024-05-30 00:11:02.553+01	2024-05-30 00:11:02.553+01
14	1	glucose_meter	Test	\N	\N	2024-05-30 00:17:20.538+01	2024-05-30 00:17:20.538+01
15	1	glucose_meter	Test	\N	\N	2024-05-30 08:33:14.307+01	2024-05-30 08:33:14.307+01
\.


--
-- Name: healths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.healths_id_seq', 15, true);


--
-- Name: healths healths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.healths
    ADD CONSTRAINT healths_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

