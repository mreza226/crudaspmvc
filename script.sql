USE [TestApp]
GO
/****** Object:  Table [dbo].[employee]    Script Date: 03/31/2017 21:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nama] [nvarchar](50) NULL,
	[status] [nvarchar](50) NULL,
	[airport] [nvarchar](50) NULL,
	[company] [nvarchar](50) NULL,
	[tgl_daftar] [date] NULL,
 CONSTRAINT [PK_employee] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
