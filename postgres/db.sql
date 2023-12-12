-- employee_details
-- departments
-- roles
-- idea_status
-- employee_mapping
-- idea_list
-- idea_history

-- create database zelis-ideathon;

--CREATE
-- employee_details
CREATE TABLE IF NOT EXISTS public.employee_details
(
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    employee_id integer NOT NULL,
    phone_no character varying(20) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    created_date timestamp without time zone,
    updated_date timestamp without time zone,
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT employee_details_pkey PRIMARY KEY (employee_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employee_details
    OWNER to postgres;

-- departments
CREATE TABLE IF NOT EXISTS public.departments
(
    department_id integer NOT NULL DEFAULT nextval('departments_department_id_seq'::regclass),
    department_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT departments_pkey PRIMARY KEY (department_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.departments
    OWNER to postgres;

-- roles
CREATE TABLE IF NOT EXISTS public.roles
(
    role_id integer NOT NULL DEFAULT nextval('roles_role_id_seq'::regclass),
    role_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (role_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to postgres;

-- idea_status
CREATE TABLE IF NOT EXISTS public.idea_status
(
    status_id integer NOT NULL DEFAULT nextval('idea_status_status_id_seq'::regclass),
    status_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT idea_status_pkey PRIMARY KEY (status_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.idea_status
    OWNER to postgres;

-- employee_mapping
CREATE TABLE IF NOT EXISTS public.employee_mapping
(
    employee_id integer NOT NULL DEFAULT nextval('employee_mapping_employee_id_seq'::regclass),
    department_id integer,
    role_id integer,
    CONSTRAINT employee_mapping_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_mapping_department_id_fkey FOREIGN KEY (department_id)
        REFERENCES public.departments (department_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT employee_mapping_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.roles (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employee_mapping
    OWNER to postgres;

-- idea_list
CREATE TABLE IF NOT EXISTS public.idea_list
(
    id integer NOT NULL DEFAULT nextval('idea_list_id_seq'::regclass),
    idea_name text COLLATE pg_catalog."default" NOT NULL,
    idea_description text COLLATE pg_catalog."default" NOT NULL,
    status_id integer NOT NULL,
    employee_id integer NOT NULL,
    CONSTRAINT idea_list_pkey PRIMARY KEY (id),
    CONSTRAINT fk_status FOREIGN KEY (status_id)
        REFERENCES public.idea_status (status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.idea_list
    OWNER to postgres;

-- idea_history
CREATE TABLE IF NOT EXISTS public.idea_history
(
    idea_id integer NOT NULL DEFAULT nextval('idea_history_idea_id_seq'::regclass),
    employee_id integer,
    idea_title character varying(255) COLLATE pg_catalog."default",
    idea_description text COLLATE pg_catalog."default",
    submit_date timestamp without time zone,
    modified_date timestamp without time zone,
    status_id integer,
    CONSTRAINT idea_history_pkey PRIMARY KEY (idea_id),
    CONSTRAINT fk2_idea_history FOREIGN KEY (status_id)
        REFERENCES public.idea_status (status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_idea_history FOREIGN KEY (idea_id)
        REFERENCES public.idea_list (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.idea_history
    OWNER to postgres;

-- INSERT
-- departments
INSERT INTO departments (department_id, department_name) 
VALUES (1, 'ZNA'),(2, 'CCS'),(3, 'PAYMENTS'),(4, 'SUPPORT'),(5, 'ZADA/ZDI');

-- roles
INSERT INTO roles (role_id, role_name) 
VALUES (1, 'manager'),(2, 'employee');

-- idea_status
INSERT INTO status (department_id, department_name) 
VALUES (1, 'submitted'),(2, 'in review'),(3, 'manager approval'),(4, 'in progress'),(5, 'deployed'),(6, 'rejected');

-- employee_mapping
INSERT INTO employee_mapping (employee_id, department_id , role_id) VALUES ($1, $2, $3) RETURNING *




