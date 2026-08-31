"use client";

import { lazy } from "react";

export const Dashboard = lazy(() => import("./admin/Dashboard"));
export const CategoriesDashboard = lazy(() => import("./admin/categories/Dashboard"));
export const VinylsDashboard = lazy(() => import("./admin/vinyls/Dashboard"));

export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));

export const NotFound = lazy(() => import("./not-found/Not-found"));
